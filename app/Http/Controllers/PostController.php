<?php

namespace App\Http\Controllers;

use App\Models\Action;
use App\Models\Bookmark;
use App\Models\Category;
use App\Models\ContentSeen;
use App\Models\Like;
use App\Models\Notification;
use App\Models\Page;
use App\Models\Post;
use App\Models\Report;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;
use Ternobo\TernoboWire\TernoboWire;

class PostController extends Controller
{

    public function startsWith($string, $startString)
    {
        $len = strlen($startString);
        return (substr($string, 0, $len) === $startString);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $messages = [
            "media.max" => "فایل انتخابی از حد مجاز بزرگتر است(۱۰ مگابایت).",
            "text.required_without" => "متن یا یک فایل چند رسانه‌ای انتخاب کنید.",
        ];
        $validator = Validator::make($request->all(), [
            "media" => "mimes:jpg,jpeg,png,bmp,mp4|max:30000",
            "text" => "required_without:media|max:2500",
            "type" => "required",
        ], $messages);

        // $mime = $request->file("media")->getMimeType();
        // // dd($mime);
        if ($validator->fails()) {
            return response()->json(array("result" => false, "errors" => $validator->errors()));
        } else {

            $mentions = array();
            $matches = array();
            preg_match_all('/\B@(\w+)/', $request->text, $matches);
            if (isset($matches[1])) {
                foreach ($matches as $match) {
                    foreach ($match as $slug) {
                        if ((!$this->startsWith($slug, "@") && !in_array($slug, $mentions))) {
                            $mentions[] = $slug;
                        }
                    }
                }
            }

            $text = htmlentities($request->text);

            // The Regular Expression filter
            $reg_exUrl = "/(\s((https?:\/\/)?(www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)|(https?:\/\/)?(www\.)?(?!ww)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)))/";

            $text = (preg_replace_callback($reg_exUrl, function ($matches) {
                foreach ($matches as $match) {
                    return "<a target='_blank' href='" . $this->toURL($match) . "'>$match</a>";
                }
            }, $text));

            $text = preg_replace('/\B@(\w+)/', "<a href=" . url("/") . "/" . "$0" . ">$0</a>", $text);
            $text = str_replace("/@", "/", $text);

            $post = new Post();
            $post->user_id = Auth::user()->id;
            $post->page_id = Auth::user()->personalPage->id;
            $post->text = $text;
            if ($request->has("category")) {
                $category = Category::query()->where("name", $request->category)
                    ->where("page_id", Auth::user()->personalPage->id)
                    ->firstOrCreate(["name" => $request->category, "page_id" => Auth::user()->personalPage->id]);
                $post->category_id = $category->id;
            }

            if ($request->has("tags")) {
                $tags = json_decode($request->tags);
                foreach ($tags as $tag) {
                    if (Tag::where("name", $tag)->first() instanceof Tag) {
                        continue;
                    }
                    $thetag = new Tag();
                    $thetag->name = $tag;
                    $thetag->save();
                }
                $post->tags = json_encode($tags);
            }
            $post->type = "post";
            $post->show = $request->type;
            $medias = array();
            if ($request->has("media")) {
                $file = $request->file("media")->store("medias");

                if ($request->has("sizes")) {
                    $image = Image::make(Storage::disk('local')->getAdapter()->getPathPrefix() . $file);
                    $sizes = (json_decode($request->sizes));
                    //    dd($sizes);
                    $image = $image->crop(intval($sizes->width), intval($sizes->height), intval($sizes->left), intval($sizes->top));
                    $image->save(null, 90, "jpg");
                }
                $medias = array(url($file));
            }
            $post->medias = json_encode($medias);
            // dd($request);
            $result = $post->save();
            Auth::user()->personalPage->addAction("post", $post->id);
            foreach ($mentions as $mention) {
                $page = Page::query()->where("slug", $mention)->first();
                if ($page instanceof Page) {
                    Notification::sendNotification("mention", $post->id, $page->id, $post->id);
                }
            }
            //  dd($mentions);
            return response()->json(array("result" => $result));
        }
    }

    public function bookmarkPost($post_id)
    {
        $post = Post::findOrFail($post_id);
        $bookmark = Bookmark::query()->where("user_id", Auth::user()->id)->where("post_id", $post_id)->first();
        $result = false;
        $is_bookmark = true;
        if ($bookmark instanceof Bookmark) {
            $result = $bookmark->delete();
            $is_bookmark = false;
        } else {
            $bookmark = new Bookmark();
            $bookmark->user_id = Auth::user()->id;
            $bookmark->post_id = $post_id;
            $result = $bookmark->save();
        }
        return response()->json(array("result" => $result, "like" => $is_bookmark));
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

    public function sharePost($post_id, Request $request)
    {
        Post::findOrFail($post_id);
        $mentions = array();
        $matches = array();
        preg_match_all('/\B@(\w+)/', $request->text, $matches);
        if (isset($matches[1])) {
            foreach ($matches as $match) {
                foreach ($match as $slug) {
                    if ((!$this->startsWith($slug, "@") && !in_array($slug, $mentions))) {
                        $mentions[] = $slug;
                    }
                }
            }
        }

        $text = preg_replace('/\B@(\w+)/', "<a href=" . url("/") . "/" . "$0" . ">$0</a>", htmlentities($request->text));
        $text = str_replace("/@", "/", $text);

        $post = new Post();
        $post->user_id = Auth::user()->id;
        $post->page_id = Auth::user()->personalPage->id;
        $post->text = $text;
        if ($request->has("category")) {
            $category = Category::query()->where("name", $request->category)
                ->where("page_id", Auth::user()->personalPage->id)
                ->firstOrCreate(["name" => $request->category, "page_id" => Auth::user()->personalPage->id]);
            $post->category_id = $category->id;
        }

        if ($request->has("tags")) {
            $tags = json_decode($request->tags);
            foreach ($tags as $tag) {
                if (Tag::where("name", $tag)->first() instanceof Tag) {
                    continue;
                }
                $thetag = new Tag();
                $thetag->name = $tag;
                $thetag->save();
            }
            $post->tags = json_encode($tags);
        }
        $post->type = "share";
        $post->show = $request->type;
        $medias = array();
        if ($request->has("media")) {
            $medias = array(url($request->file("media")->store("medias")));
        }
        $post->medias = json_encode($medias);
        $post->post_id = $post_id;
        // $result = $post->save();
        Auth::user()->personalPage->addAction("share", $post->id);
        foreach ($mentions as $mention) {
            $page = Page::query()->where("slug", $mention)->first();
            if ($page instanceof Page) {
                Notification::sendNotification("mention", $post->id, $page->id, $post->id);
            }
        }
        return response()->json(array("result" => $result));
    }

    public function shareModalPost(Post $post)
    {
        return view("layouts.components.share-post", array("post" => $post));
    }

    public function report(Request $request)
    {
        $messages = [
            "post_id.exists" => "این محتوا حدف شده",
            "comment_id.exists" => "این کامنت حذف شده",
            "report" => "دلیل گزارش اجباری است",
        ];
        $validator = Validator::make($request->all(), [
            "comment_id" => "required_without:post_id",
            "post_id" => "required_without:comment_id",
            "report" => "required",
        ], $messages);
        if ($validator->fails()) {
            return response()->json(array("result" => false, "errors" => $validator->errors()));
        } else {
            $report = new Report();
            if ($request->has("comment_id")) {
                $report->comment_id = $request->comment_id;
            } else {
                $report->post_id = $request->post_id;
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
            } elseif (($categories->total() > $request->page)) {
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
            return response()->json([]);
        }
        $tags = Tag::query()->where("name", "like", "%$term%")->paginate(10);
        $formatted_tags = [];
        foreach ($tags as $tag) {
            $formatted_tags[] = ['id' => $tag->name, 'text' => $tag->name];
        }
        $more = false;
        if (($tags->total() > 1) && !$request->has("page")) {
            $more = true;
        } elseif (($tags->total() > $request->page)) {
            $more = true;
        }
        return response()->json(array("results" => $formatted_tags, "pagination" => ["more" => $more]));
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Post $post
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
        //  dd($posts);
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
        $randomhash = (PostController::quickRandom(18));
        $url = url("/posts/" . $post_id);
        $html_code = view("embedcode", array("url" => $url, "randomhash" => $randomhash, "post" => $post))->render();
        return response()->json([
            "result" => true,
            "code" => $html_code,
        ]);
    }

    public static function quickRandom($length = 16)
    {
        $pool = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return substr(str_shuffle(str_repeat($pool, 5)), 0, $length);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Post $post
     * @return \Illuminate\Http\Response
     */
    public function edit(Post $post)
    {
        return view("layouts.components.edit-post", ["post" => $post]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Post $post
     * @return \Illuminate\Http\Response
     */
    public function update(Post $post, Request $request)
    {
        if ($post->page->user_id != Auth::user()->id) {
            return abort(404);
        }

        // dd($request->all());
        $messages = [
            "media.max" => "فایل انتخابی از حد مجاز بزرگتر است(۱۰ مگابایت).",
            "text.required_without" => "متن یا یک فایل چند رسانه‌ای انتخاب کنید.",
        ];
        $validator = Validator::make($request->all(), [
            "media" => "mimes:jpg,jpeg,png,bmp,mp4|max:30000",
            "text" => "required_without:media|max:2500",
            "type" => "required",
        ], $messages);

// $mime = $request->file("media")->getMimeType();
        // // dd($mime);
        if ($validator->fails()) {
            return response()->json(array("result" => false, "errors" => $validator->errors()));
        } else {

            $mentions = array();
            $matches = array();
            preg_match_all('/\B@(\w+)/', $request->text, $matches);
            if (isset($matches[1])) {
                foreach ($matches as $match) {
                    foreach ($match as $slug) {
                        if ((!$this->startsWith($slug, "@") && !in_array($slug, $mentions))) {
                            $mentions[] = $slug;
                        }
                    }
                }
            }

            $text = htmlentities($request->text);

            // The Regular Expression filter
            $reg_exUrl = "/(\s((https?:\/\/)?(www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)|(https?:\/\/)?(www\.)?(?!ww)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)))/";

            $text = (preg_replace_callback($reg_exUrl, function ($matches) {
                foreach ($matches as $match) {
                    return "<a target='_blank' href='" . $this->toURL($match) . "'>$match</a>";
                }
            }, $text));

            $text = preg_replace('/\B@(\w+)/', "<a href=" . url("/") . "/" . "$0" . ">$0</a>", $text);
            $text = str_replace("/@", "/", $text);

            $post->text = $text;
            if ($request->filled("category")) {
                $category = Category::query()->where("name", $request->category)
                    ->where("page_id", Auth::user()->personalPage->id)
                    ->firstOrCreate(["name" => $request->category, "page_id" => Auth::user()->personalPage->id]);
                $post->category_id = $category->id;
            }

            if ($request->filled("tags")) {
                $tags = json_decode($request->tags);
                foreach ($tags as $tag) {
                    if (Tag::where("name", $tag)->first() instanceof Tag) {
                        continue;
                    }
                    $thetag = new Tag();
                    $thetag->name = $tag;
                    $thetag->save();
                }
                $post->tags = json_encode($tags);
            }
            $post->type = "post";
            $post->show = $request->type;
            $medias = array();
            if ($request->has("media")) {
                $file = $request->file("media")->store("medias");

                if ($request->has("sizes")) {
                    $image = Image::make(Storage::disk('local')->getAdapter()->getPathPrefix() . $file);
                    $sizes = (json_decode($request->sizes));
                    //    dd($sizes);
                    $image = $image->crop(intval($sizes->width), intval($sizes->height), intval($sizes->left), intval($sizes->top));
                    $image->save(null, 90, "jpg");
                }
                $medias = array(url($file));
                $post->medias = json_encode($medias);

            }

            // dd($request);
            $result = $post->save();
            // Auth::user()->personalPage->addAction("post", $post->id);
            // foreach ($mentions as $mention) {
            //     $page = Page::query()->where("slug", $mention)->first();
            //     if ($page instanceof Page) {
            //         Notification::sendNotification("mention", $post->id, $page->id, $post->id);
            //     }
            // }
            //  dd($mentions);
            return response()->json(array("result" => $result));
        }
    }

    private function toURL($url)
    {
        return (Str::startsWith($url, "http") || Str::startsWith($url, "https")) ? $url : "http://" . $url;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Post $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        if ($post->user_id === Auth::user()->id) {
            return response()->json(array("result" => $post->delete()));
        } else {
            return abort(404);
        }
    }

}
