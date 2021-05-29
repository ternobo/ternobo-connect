<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Page;
use App\Models\Post;
use Artesaos\SEOTools\Facades\SEOTools;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use PHPHtmlParser\Dom;
use PHPHtmlParser\Options;
use Ternobo\TernoboWire\TernoboWire;

class ArticlesController extends Controller
{
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        if (Auth::check()) {
            SEOTools::setTitle("نوشتن مقاله جدید");
            return TernoboWire::render("Articles/NewArticle");
        } else {
            return redirect("/");
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (Auth::check()) {
            $messages = [
                "thumbnail.mimes" => "فقط می‌توانید تصویر jpg, jpeg, png و bmp انتخاب کنید",
                "title.required" => "عنوان مقاله اجباری است",
                "text.required" => "متن مقاله اجباری است",
                "slug.unique" => "نامک مقاله تکراری است",
                "slug.regex" => "نامک مقاله نامعتبر است است",
            ];
            $rules = [
                "thumbnail" => "mimes:jpg,jpeg,png,bmp",
                "title" => "required",
                "text" => "required",
            ];
            $pages = ['activities', 'articles', 'contact'];
            if ($request->filled("slug")) {
                if (in_array($request->slug, $pages)) {
                    return response()->json(array("result" => false, "errors" => ['slug' => 'نامک انتخابی تامعتبر است']));
                }
                $rules['slug'] = "unique:posts,slug|regex:/((?!([ @\/.\\#~!%^&*,?\";']))\\w){1,200}$/";
            }

            $validator = Validator::make($request->all(), $rules, $messages);

            if ($validator->fails()) {
                return response()->json(array("result" => false, "errors" => $validator->errors()));
            } else {
                $post = new Post();
                $post->user_id = Auth::user()->id;
                $post->page_id = Auth::user()->personalPage->id;
                $post->title = $request->title;

                $text = \App\Models\Post::scriptStripper($request->text);
                $dom = new Dom();
                $dom->setOptions((new Options())
                        ->setPreserveLineBreaks(true)
                        ->setWhitespaceTextNode(true)
                        ->setRemoveScripts(true)
                        ->setRemoveStyles(true));
                $dom->loadStr($text);
                $images = $dom->find("img");

                foreach ($images as $image) {
                    $url = $image->getAttribute("src");
                    if (Str::startsWith($url, "http") || Str::startsWith($url, "https")) {
                        $contents = file_get_contents($url);
                        $name = time() . Auth::user()->id . substr($url, strrpos($url, '/') + 1);

                        Storage::put("medias/" . $name, $contents);
                        $image->setAttribute("src", url("/medias/$name"));
                        $image->setAttribute("srcset", "");
                    } elseif (Str::startsWith($url, "data:image")) {
                        list($type, $data) = explode(';', $data);
                        list(, $data) = explode(',', $data);
                        // $name = time() . uniqid() . Auth::user()->id;

                        // Storage::put("medias/" . $name, $data);
                        // $image->setAttribute("src", url("/medias/$name"));
                        // $image->setAttribute("srcset", "");
                    }
                }

                $post->text = $dom->outerHtml;

                if ($request->category !== null) {
                    $category = Category::query()->where("name", $request->category)
                        ->where("page_id", Auth::user()->getPage()->id)
                        ->firstOrCreate(["name" => $request->category, "page_id" => Auth::user()->getPage()->id]);
                    $post->category_id = $category->id;
                }

                if ($request->filled("slug")) {
                    $post->slug = $request->slug;
                } else {
                    $post->slug = Str::slug($request->title);
                }

                $post->tags = json_encode(json_decode($request->tags));
                $post->type = "article";
                $post->show = "public";
                $medias = array();
                if ($request->file("media") !== null) {
                    $medias = array(url($request->file("media")->store("medias")));
                }
                $post->medias = json_encode($medias);
                $result = $post->save();
                $link = url("/" . Auth::user()->username . "/" . $post->id);
                if ($post->slug !== null) {
                    $link = url("/" . Auth::user()->username . "/" . $post->slug);
                }
                Auth::user()->personalPage->addAction("post", $post->id);
                return response()->json(array("result" => $result, "redirect" => $link));
            }
        } else {
            return redirect("/");
        }
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Page $article
     * @return \Illuminate\Http\Response
     */
    public function show(Page $page, $article)
    {
        $article = Post::query()
            ->with("page")
            ->with("category")
            ->where("id", $article)->orWhere("slug", $article);
        if (Auth::check()) {
            $article = $article->with("mutualLikes");
        }

        $article = $article->firstOrFail();

        if ($article->type === "article" && $article->user->active) {
            SEOTools::setTitle("$article->title");
            SEOTools::setDescription(mb_substr(strip_tags($article->text), 0, 250));
            SEOTools::opengraph()->setUrl(\Illuminate\Support\Facades\URL::current());
            SEOTools::setCanonical(\Illuminate\Support\Facades\URL::current());
            SEOTools::opengraph()->addProperty('type', 'article');
            SEOTools::opengraph()->addProperty('title', $article->title);
            SEOTools::opengraph()->addProperty('locale', "fa_IR");
            SEOTools::opengraph()->addProperty('article:published_time', $article->created_at);
            SEOTools::opengraph()->addProperty('article:modified_time', $article->created_at);
            SEOTools::opengraph()->addProperty('article:author', $article->user->name);
            SEOTools::jsonLd()->addImage($article->getMedia());

            $articles = Post::where("type", "article")->where("page_id", $article->user->getPage()->id)->get();

            $comments = $article->getComments();

            return TernoboWire::render("Articles/Article", array("post" => $article, "comments" => $comments, "userposts" => count($articles)));
        } else {
            return abort(404);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param \App\Models\Post $article
     * @return \Illuminate\Http\Response
     */
    public function edit($article)
    {
        if (Auth::check()) {
            $article = Post::query()
                ->with("category")
                ->findOrFail($article);
            if ($article->type === "article" && $article->user_id === Auth::user()->id) {
                SEOTools::setTitle("ویرایش مقاله $article->title");

                return TernoboWire::render("Articles/NewArticle", array("article" => $article));
            } else {
                return abort(404);
            }
        } else {
            return redirect("/");
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Post $article
     * @return \Illuminate\Http\Response
     */
    public function update(Post $article, Request $request)
    {

        if (Auth::check()) {
            if ($article->type === "article") {
                if ($article->user_id !== Auth::user()->id) {
                    return abort(404);
                }
                $messages = [
                    "thumbnail.mimes" => "فقط می‌توانید تصویر jpg, jpeg, png و bmp انتخاب کنید",
                    "title.required" => "عنوان مقاله اجباری است",
                    "text.required" => "متن مقاله اجباری است",
                    "slug.unique" => "نامک مقاله تکراری است",
                    "slug.regex" => "نامک مقاله نامعتبر است است",

                ];
                $rules = [
                    "thumbnail" => "mimes:jpg,jpeg,png,bmp",
                    "title" => "required",
                    "text" => "required",
                ];
                if ($request->has("slug") && $request->slug !== null) {
                    $rules['slug'] = "unique:posts,slug,$article->id|regex:/((?!([ @\/.\\#~!%^&*,?\";']))\\w){1,200}$/";
                }

                $validator = Validator::make($request->all(), $rules, $messages);

                if ($validator->fails()) {
                    return response()->json(array("result" => false, "errors" => $validator->errors()));
                } else {
                    $article->title = $request->title;

                    $text = \App\Models\Post::scriptStripper($request->text);
                    $dom = new Dom();
                    $dom->setOptions((new Options())
                            ->setPreserveLineBreaks(true)
                            ->setWhitespaceTextNode(true)
                            ->setRemoveScripts(true)
                            ->setRemoveStyles(true));
                    $dom->loadStr($text);
                    $images = $dom->find("img");
                    foreach ($images as $image) {
                        $url = $image->getAttribute("src");
                        if ((Str::startsWith($url, "http") || Str::startsWith($url, "https")) && !(Str::startsWith($url, url("/")))) {
                            $contents = file_get_contents($url);
                            $name = time() . Auth::user()->id . substr($url, strrpos($url, '/') + 1);

                            Storage::put("medias/" . $name, $contents);
                            $image->setAttribute("src", url("/medias/$name"));
                            $image->setAttribute("srcset", "");
                        } elseif (Str::startsWith($url, "data:image")) {
                            list($type, $data) = explode(';', $url);
                            list(, $data) = explode(',', $url);
                            $type = substr($type, strrpos($type, '/') + 1);

                            $name = time() . uniqid() . Auth::user()->id . ".$type";

                            Storage::put("medias/" . $name, base64_decode($data));
                            $image->setAttribute("src", url("/medias/$name"));
                            $image->setAttribute("srcset", "");
                        }
                    }
                    $article->text = $dom->outerHtml;

                    if ($request->filled("slug")) {
                        $article->slug = $request->slug;
                    } else {
                        $article->slug = Str::slug($request->title);
                    }

                    if ($request->filled("category")) {
                        $category = Category::query()->where("name", $request->category)
                            ->where("page_id", Auth::user()->getPage()->id)
                            ->firstOrCreate(["name" => $request->category, "page_id" => Auth::user()->getPage()->id]);
                        $article->category_id = $category->id;
                    }
                    $article->tags = json_encode(json_decode($request->tags));
                    $article->show = "public";
                    $medias = [];

                    if ($request->file("media") != null) {
                        $medias = array(url($request->file("media")->store("medias")));
                        $article->medias = json_encode($medias);
                    }
                    $user = Auth::user();
                    $user->touch();

                    $result = $article->save();
                    $link = url("/" . Auth::user()->username . "/" . $article->id);
                    if ($article->slug !== null) {
                        $link = url("/" . Auth::user()->username . "/" . $article->slug);
                    }
                    return response()->json(array("result" => $result, "redirect" => $link));
                }
            } else {
                return abort(404);
            }
        } else {
            return redirect("/");
        }
    }

/**
 * Remove the specified resource from storage.
 *
 * @param \App\Models\Post $article
 * @return \Illuminate\Http\Response
 */
    public function destroy(Post $article)
    {
        if (Auth::check()) {
            if ($article->user_id === Auth::user()->id) {
                $article->delete();
            } else {
                return abort(404);
            }
        } else {
            return redirect("/");
        }
    }

}
