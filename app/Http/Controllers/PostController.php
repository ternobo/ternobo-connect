<?php

namespace App\Http\Controllers;

use App\Events\LikeEvent;
use App\HTMLMinifier;
use App\Http\Requests\PostRequest;
use App\Models\Action;
use App\Models\Category;
use App\Models\Comment;
use App\Models\ContentSeen;
use App\Models\Like;
use App\Models\Notification;
use App\Models\Page;
use App\Models\Post;
use App\Models\PostContent;
use App\Models\PostSlide;
use App\Models\Report;
use App\Models\Tag;
use App\SocialMediaTools;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Ternobo\TernoboWire\TernoboWire;

class PostController extends Controller
{

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(PostRequest $request)
    {
        $slides = $request->slides;
        $user = Auth::user();
        $user->load("personalPage");
        $category = null;
        if ($request->filled("category")) {
            $category = Category::query()->where("name", $request->category)->where("page_id", $user->personalPage->id)->firstOrCreate([
                "name" => $request->category,
                "page_id" => $user->personalPage->id,
                "type" => "post",
            ])->id;
        }
        $mentions = null;
        $tags = [];

        $mentions = [];

        $draft = $request->draft == '1';

        $post = Post::query()->create([
            'type' => $draft ? 'draft_post' : 'post',
            'user_id' => $user->id,
            'page_id' => $user->personalPage->id,
            'medias' => [],
            'show' => "public",
            "category_id" => $category,
            'can_tip' => $request->canDonate,
        ]);
        foreach ($slides as $slide_input) {
            if (!(count($slide_input) > 0)) {
                continue;
            }
            $slide = PostSlide::query()->create([
                'page_id' => $user->personalPage->id,
                'post_id' => $post->id,
            ]);
            foreach ($slide_input as $type => $content) {
                $sort = (int) $content['sort'];
                $content = $content['content'];
                switch ($type) {
                    case "text":
                        // Process
                        $text = SocialMediaTools::safeHTML($content);
                        $text_mentions = SocialMediaTools::getMentions($text);

                        $slideTags = array_slice(SocialMediaTools::getHashtags($text), 0, 3);

                        PostContent::query()->create([
                            'slide_id' => $slide->id,
                            'page_id' => $user->personalPage->id,
                            'sort' => $sort,
                            'content' => $text,
                            'type' => 'text',
                        ]);

                        if (count($tags) < 3) {
                            $tags = array_merge($slideTags, $tags);
                        }
                        $mentions = array_merge($text_mentions, $mentions);

                        break;

                    case "title":
                        PostContent::query()->create([
                            'slide_id' => $slide->id,
                            'page_id' => $user->personalPage->id,
                            'sort' => $sort,
                            'content' => $content,
                            'type' => 'title',
                        ]);
                        break;

                    case "media":
                        $media = $content->store("medias");
                        PostContent::query()->create([
                            'slide_id' => $slide->id,
                            'page_id' => $user->personalPage->id,
                            'sort' => $sort,
                            'content' => SocialMediaTools::uploadPostImage($media, 90),
                            'type' => 'media',
                        ]);
                        break;
                }
            }
        }
        SocialMediaTools::callMentions($mentions, $post->id);
        $post->tags = $tags;
        $post->save();
        $user->personalPage->addAction("post", $post->id);

        $post->load(["page", 'likes', 'mutualLikes', 'category', 'slides', "slides.content"]);

        return response()->json(array("result" => true, "post" => $post));
    }

    public function likePost($post_id)
    {
        $post = Post::findOrFail($post_id);
        $page = Auth::user()->personalPage;
        $like = Like::query()->where("page_id", $page->id)->where("post_id", $post_id)->first();
        $result = false;
        $is_like = true;
        if ($like instanceof Like) {
            Notification::query()->where("connected_to", $like->id)->delete();
            Action::query()->where("page_id", $page->id)->where("post_id", $post_id)->where("action", "like")->delete();
            $result = $like->delete();
            $is_like = false;
        } else {
            $like = new Like();
            $like->page_id = $page->id;
            $like->post_id = $post_id;
            $result = $like->save();
            $page->addAction("like", $post_id, $like->id);
            Notification::sendNotification("like", $post_id, $post->page_id, $like->id);
            event(new LikeEvent($like));
        }
        return response()->json(array("result" => $result, "like" => $is_like));
    }

    public function getLikes(Request $request)
    {
        $likes = [];
        if ($request->has("comment_id")) {
            $comment = Post::findOrFail($request->comment_id);
            $likes = Like::query()->with("page")->where("comment_id", $comment->id)->select(array("page_id", 'id'))->paginate(15);
        } elseif ($request->has("post_id")) {
            $post = Post::findOrFail($request->post_id);
            $likes = Like::query()->with("page")->where("post_id", $post->id)->select(array("page_id", 'id'))->paginate(15);
        }
        return response()->json(['likes' => $likes]);
    }

    public function report(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "comment_id" => "required_without:post_id",
            "post_id" => "required_without:comment_id",
            "report" => "required",
        ], [], ["report" => __("report-reason")]);
        if ($validator->fails()) {
            return response()->json(array("result" => false, "errors" => $validator->errors()));
        } else {
            $report = new Report();
            if ($request->has("comment_id")) {
                $report->reportable_id = $request->comment_id;
                $report->reportable_type = Comment::class;

            } else {
                $report->reportable_id = $request->post_id;
                $report->reportable_type = Post::class;
            }
            $report->reason = $request->report;
            if ($request->has("moreinfo")) {
                $report->description = $request->moreinfo;
            }
            $report->user_id = Auth::user()->id;
            $report->save();
            return response()->json(array("result" => true, "msg" => "گزارش تخلف شما با موفقیت ثبت شد"));
        }
    }

    public function getCategories(Request $request)
    {
        $term = trim($request->q);
        $categories = Category::query()->where("page_id", Auth::user()->personalPage->id)->where("name", "like", "%$term%")->paginate(10);
        $more = false;
        if (empty($term)) {
            $categories = Category::query()->where("page_id", Auth::user()->personalPage->id)->get();
        } else {

            if (($categories->total() > 1) && !$request->has("page")) {
                $more = true;
            } elseif ($categories->total() > $request->page) {
                $more = true;
            }
        }

        $formatted_categories = [];
        foreach ($categories as $category) {
            $formatted_categories[] = ['id' => $category->name, 'text' => $category->name];
        }

        return response()->json(array("results" => $formatted_categories, "pagination" => ["more" => $more]));
    }

    public function getTags(Request $request)
    {
        $term = trim($request->q);
        if (empty($term)) {
            return response()->json(["results" => []]);
        }
        $tags = Tag::query()->where("name", "like", "$term%")->paginate(10);
        $formatted_tags = [];
        foreach ($tags as $tag) {
            $formatted_tags[] = ['key' => $tag->name, 'value' => $tag->name];
        }
        return response()->json(array("results" => $formatted_tags));
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Post $post
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $post_id)
    {
        $post = Post::query()
            ->with("category")
            ->with("page");

        if (Auth::check()) {
            $post = $post->with("mutualLikes");
        }

        $post = $post->findOrFail($post_id);

        if (($post->type === "post" || $post->type === "share") && $post->user->active) {
            return TernoboWire::render("PostPage", array("post" => $post));
        }
        return abort(404);
    }

    /**
     * Render embed post
     */
    public function embedPost($post_id, Request $request)
    {
        $post = Post::with("page")
            ->with("category")
            ->findOrFail($post_id);
        return TernoboWire::render("Embed/Widget", array("post" => $post));
    }

    public function seenPost(Request $request)
    {
        $posts = $request->posts;
        foreach ($posts as $post_id) {
            if (!(ContentSeen::where("post_id", $post_id)->where("user_id", Auth::user()->id)->first() instanceof ContentSeen)) {
                $seen = new ContentSeen();
                $seen->post_id = $post_id;
                $seen->user_id = Auth::user()->id;
                $seen->save();
            }
        }
        return response()->json(array("result" => true));
    }

    public function getEmbed($post_id)
    {
        $post = url("/embed-posts/" . $post_id);
        $randomhash = (Str::uuid());
        $url = url("/posts/" . $post_id);
        $html_code = HTMLMinifier::html(view("embedcode", array("url" => $url, "randomhash" => $randomhash, "post" => $post))->render());
        return response()->json([
            "result" => true,
            "code" => $html_code,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Post $post
     * @return \Illuminate\Http\Response
     */
    public function update(Post $post, PostRequest $request)
    {
        $slides = $request->slides;
        $user = Auth::user();
        $user->load("personalPage");

        $draft = $request->draft == '1';

        $deletedSlides = [];

        $category = $request->filled("category") ? Category::query()->firstOrCreate([
            'page_id' => $post->page_id,
            'name' => $request->category,
            'type' => "post",
        ])->id : null;
        $post->update([
            'type' => $draft ? "draft_post" : "post",
            'category_id' => $category,
            'can_tip' => $request->canDonate,
        ]);

        if ($request->filled("deletedSlides")) {
            $deletedSlides = json_decode($request->deletedSlides);
            PostSlide::query()->whereIn("id", $deletedSlides)->delete();
        }

        $mentions = null;
        $tags = [];

        foreach ($slides as $slide_input) {
            try {
                if (!(count($slide_input) > 0)) {
                    continue;
                }
            } catch (\Throwable $th) {
                return abort(400);
            }

            $slide = isset($slide_input['id']) && PostSlide::findOrFail($slide_input['id']) != null ?
            PostSlide::findOrFail($slide_input['id']) :
            PostSlide::query()->create([
                'page_id' => $user->personalPage->id,
                'post_id' => $post->id,
            ]);

            $added_elements = [];

            $availableOptions = ['text', 'media', 'title'];
            $items = [];
            foreach ($slide_input as $type => $content) {
                if ($type == "id") {
                    continue;
                }

                $sort = (int) $content['sort'];
                $content = $content['content'];
                $typeSql = $type;
                if ($type == "media_notChange") {
                    $typeSql = "media";
                }

                if (in_array($type, $added_elements)) {
                    throw new HttpResponseException(response()->json(['result' => false, 'errors' => ["duplicated element - $type"]], 422));
                }
                $postContent = PostContent::query()->where("type", $typeSql)->where("slide_id", $slide->id)->first();

                switch ($type) {
                    case "text":
                        array_push($items, "text");

                        // Process
                        $text = SocialMediaTools::safeHTML($content);
                        $mentions = SocialMediaTools::getMentions($text);

                        $slideTags = array_slice(SocialMediaTools::getHashtags($text), 0, 3);

                        if ($postContent == null) {
                            PostContent::query()->create([
                                'slide_id' => $slide->id,
                                'page_id' => $user->personalPage->id,
                                'sort' => $sort,
                                'content' => $text,
                                'type' => 'text',
                            ]);
                        } else {
                            $postContent->update([
                                'sort' => $sort,
                                'content' => $text,
                            ]);
                        }

                        if (count($tags) < 3) {
                            $tags = array_merge($slideTags, $tags);
                        }
                        break;

                    case "title":
                        array_push($items, "title");
                        if ($postContent == null) {
                            PostContent::query()->create([
                                'slide_id' => $slide->id,
                                'page_id' => $user->personalPage->id,
                                'sort' => $sort,
                                'content' => $content,
                                'type' => 'title',
                            ]);
                        } else {
                            $postContent->update([
                                'sort' => $sort,
                                'content' => $content,
                            ]);
                        }
                        break;

                    case "media":
                        array_push($items, "media");
                        $media = $content->store("medias");
                        if ($postContent == null) {
                            PostContent::query()->create([
                                'slide_id' => $slide->id,
                                'page_id' => $user->personalPage->id,
                                'sort' => $sort,
                                'content' => SocialMediaTools::uploadPostImage($media, 90),
                                'type' => 'media',
                            ]);
                        } else {
                            $postContent->update([
                                'sort' => $sort,
                                'content' => SocialMediaTools::uploadPostImage($media, 90),
                            ]);
                        }
                        break;
                    case "media_notChange":
                        array_push($items, "media");
                        if ($postContent != null) {
                            $postContent->update([
                                'sort' => $sort,
                            ]);
                            break;
                        }
                }
            }
            $deletedItems = array_diff($availableOptions, $items);
            PostContent::query()->whereIn("type", $deletedItems)->where("slide_id", $slide->id)->delete();
        }

        $post->tags = $tags;
        $post->save();

        $post->load(["page", 'likes', 'mutualLikes', 'category', 'slides', "slides.content"]);

        return response()->json(array("result" => true, "post" => $post));
    }

    public function publishPost($post)
    {
        return response()->json(['result' => Post::withDrafts()->findOrFail($post)->publish()]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Post $post
     * @return \Illuminate\Http\Response
     */
    public function destroy($post)
    {
        $post = Post::withDrafts()->findOrFail($post);
        if ($post->user_id === Auth::user()->id) {
            return response()->json(array("result" => $post->delete()));
        } else {
            return abort(404);
        }
    }

}
