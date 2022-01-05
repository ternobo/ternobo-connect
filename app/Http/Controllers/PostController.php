<?php

namespace App\Http\Controllers;

use App\Events\LikeEvent;
use App\Events\PostShareEvent;
use App\HTMLMinifier;
use App\Http\Middleware\Authenticate;
use App\Http\Middleware\FollowMiddlware;
use App\Http\Middleware\FullAccessUserMiddleware;
use App\Http\Requests\PostRequest;
use App\Jobs\PostDeleteProcess;
use App\Models\Action;
use App\Models\Category;
use App\Models\Comment;
use App\Models\CommunityTag;
use App\Models\ContentSeen;
use App\Models\Like;
use App\Models\Notification;
use App\Models\Page;
use App\Models\Post;
use App\Models\SlideBlock;
use App\Models\PostSlide;
use App\Models\Report;
use App\Models\Tag;
use App\Services\Poll\PollService;
use App\SocialMediaTools;
use Artesaos\SEOTools\Facades\SEOMeta;
use Artesaos\SEOTools\Facades\SEOTools;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use PHPHtmlParser\Dom;
use Ternobo\TernoboWire\TernoboWire;

class PostController extends Controller
{

    private Dom $dom;
    private PollService $pollService;

    public function __construct(Dom $dom, PollService $pollService)
    {
        $this->middleware([FollowMiddlware::class, Authenticate::class])->except([
            "show"
        ]);
        $this->middleware([FullAccessUserMiddleware::class])->only(["store", "update", "destroy"]);
        $this->dom = $dom;
        $this->pollService = $pollService;
    }

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

        DB::beginTransaction();
        try {
            if ($request->filled("category")) {
                $category = Category::query()->where("name", $request->category)->where("page_id", $user->personalPage->id)->firstOrCreate([
                    "name" => $request->category,
                    "page_id" => $user->personalPage->id,
                    "type" => "post",
                ])->id;
            }

            $draft = $request->draft == '1';
            $post = Post::withRelations()->create([
                'type' => $draft ? 'draft_post' : 'post',
                'user_id' => $user->id,
                'page_id' => $user->personalPage->id,
                'media' => [],
                'show' => "public",
                "category_id" => $category,
                'can_tip' => $request->canDonate,
            ]);

            $tagsAndMentions = $post->setContent($slides, $user, false, $this->pollService, $this->dom);

            if (!$draft) {
                SocialMediaTools::callMentions($tagsAndMentions['mentions'], $post->id);
            }
            $post->tags()->sync(Tag::addTag($tagsAndMentions["tags"]));
            $post->save();
            $user->personalPage->addAction("post", $post->id);
            $post->load(["page", "tags", 'likes', 'mutualLikes', 'category', 'slides', "slides.content"]);;
            DB::commit();
            event(new PostShareEvent($post));
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }


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
        $tags = Tag::query();
        if (empty($term)) {
            $tags = $tags->latest()->paginate(10);
        } else {
            $tags = $tags->where("name", "like", "$term%")->paginate(10);
        }
        $formatted_tags = [];
        foreach ($tags as $tag) {
            $community = CommunityTag::query()->where("tag_id", $tag->id)->first();
            $icon = null;
            if ($community instanceof CommunityTag) {
                $icon = url($community->icon);
            }

            $formatted_tags[] = ['key' => "#" . $tag->name, "icon" => $icon, 'value' => $tag->name, 'name' => "#" . $tag->name];
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
        $post = Post::withRelations()
            ->with("category")
            ->with("page");

        if (Auth::check()) {
            $post = $post->with("mutualLikes");
        }


        $post = $post->findOrFail($post_id);
        SEOMeta::addMeta("robots", "noindex");
        $page = $post->page;
        SEOMeta::addKeyword(['محتوای ' . $page->name, $page->name, $page->user->first_name, $page->user->last_name]);
        $textItem = collect($post->slides[0]->content)->filter(function ($item) {
            return $item->type == "text";
        })->first();
        if ($textItem) {
            SEOTools::setDescription($textItem->content);
        } else {
            SEOTools::setDescription("$page->name Shared Content");
        }
        if (($post->type === "post" || $post->type === "share") && $post->user->active) {
            return TernoboWire::render("PostPage", ["post" => $post, "comment" => $request->input("comment", 0)]);
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
     * @param $post
     * @return \Illuminate\Http\Response
     */
    public function update(PostRequest $request, $post)
    {
        $post = Post::withDrafts()->findOrFail($post);
        $slides = $request->slides;

        $user = Auth::user();
        $user->load("personalPage");

        $draft = $request->draft == '1';

        $deletedSlides = [];

        DB::beginTransaction();
        try {
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

            $mentions = [];
            $tags = [];

            $post->deleteBlocks();
            $post->slides()->delete();
            $tags = $post->setContent($slides, $user, false, $this->pollService, $this->dom)['tags'];
            $post->tags()->sync(Tag::addTag($tags));
            $post->save();
            DB::commit();
            event(new PostShareEvent($post));
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
        $post->fresh();
        $post->load(["page", "tags", 'likes', 'mutualLikes', 'category', 'slides', "slides.content"]);

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
            $result = $post->delete();
            if ($result) {
                PostDeleteProcess::dispatch($post);
            }
            return response()->json(array("result" => $result));
        } else {
            return abort(404);
        }
    }
}
