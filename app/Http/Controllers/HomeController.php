<?php

namespace App\Http\Controllers;

use App\Models\Bookmark;
use App\Models\Page;
use App\Models\Post;
use App\Models\SearchSuggestion;
use Artesaos\SEOTools\Facades\SEOMeta;
use Artesaos\SEOTools\Facades\SEOTools;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller
{

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Request $request)
    {
        $page = 1;
        if ($request->has("page")) {
            $page = $request->page;
        }
        $pages = Page::getSuggestions();
        $posts = Post::query()
            ->with("page")
            ->with("likes")
            ->with("mutualLikes")
            ->with("category")
            ->leftJoin("content_seens", function ($join) {
                $join->on("posts.id", "=", "content_seens.post_id")->where("content_seens.user_id", Auth::user()->id);
            })
            ->select(array("posts.*", "content_seens.created_at as seen_at"))
            ->whereRaw("(posts.page_id IN (select following from followings WHERE user_id = '" . Auth::user()->id . "' ) or `posts`.`user_id` = '" . Auth::user()->id . "')")
            ->whereRaw("IF(posts.show = 'private' AND (NOT EXISTS(SELECT * FROM connections where "
                . "(connection = '" . Auth::user()->id . "' and user_id=posts.user_id)"
                . "OR "
                . "(user_id = '" . Auth::user()->id . "' and connection=posts.user_id)"
                . ")"
                . ")"
                . ",'TRUE','FALSE') = 'FALSE'")
            ->whereHas("page.user", function ($query) {
                $query->where("active", true);
            })
            ->orderByRaw("posts.user_id = '" . Auth::user()->id . "' DESC ,seen_at IS NULL DESC, seen_at DESC")
            ->distinct("posts.id")
            ->paginate(10);

        return Inertia::render("Feed", array("posts" => $posts, "pages" => $pages));
    }

    private function generateSearch($search)
    {
        $first = true;
        $result = "";
        $replaces = array("+" => "", "-" => "", ">" => "", "<" => "", "(" => "", ")" => "", "~" => "", "*" => "", "“" => "", "”" => "", "\"" => "", "\"" => "", "ا" => "+ا*" . " +آ*");
        foreach ($search as $keyword) {
            foreach ($replaces as $key => $value) {
                //     echo $key;
                $keyword = str_replace(mb_convert_encoding($value, 'UTF-8'), $key, $keyword);
            }

            if ($first) {
                $result .= "+$keyword*";
                $first = false;
            } else {
                $result .= " +$keyword*";
            }
        }
        //    dd(($replaces));
        return $result;
    }

    private function handleGetSearch(Request $request)
    {
        if ($request->q === ".*" || $request->q === "*") {
            return abort(401);
        }
        $search = $this->generateSearch(explode(" ", $request->q));
        $results = array();
        if ($request->has("type") && $request->type === "content") {
            $posts = Post::query()
                ->with("page")
                ->with("likes")
                ->with("mutualLikes")
                ->with("category")
                ->selectRaw("MATCH (`title`, `text`) AGAINST(? IN BOOLEAN MODE) as score, posts.*", [$search])
                ->whereRaw("MATCH (`title`, `text`) AGAINST(? IN BOOLEAN MODE) > 0", [$search])
                ->orderBy("score")
                ->distinct("posts.id");

            $posts->whereHas("user", function ($query) {
                $query->where("active", true);
            });

            SEOTools::setTitle("جستجو برای " . $request->q);
            SEOTools::setDescription("نتایج جستجو برای $request->q در ترنوبو");
            SEOTools::setCanonical(\Illuminate\Support\Facades\URL::current() . "?q=$request->q&type=content");
            $results = $posts->paginate(20);
            $results->appends(['q' => $request->q, "type" => "content"]);
        } else {
            $users = Page::query()
                ->leftJoin("skills", "skills.user_id", "pages.user_id")
                ->selectRaw("MATCH (pages.name,short_bio,about,slug,location) AGAINST(? IN BOOLEAN MODE) as score, pages.*", [$search])
                ->where(function ($query) use ($search, $request) {
                    $query->whereRaw("MATCH (pages.name,short_bio,about,slug,location) AGAINST(? IN BOOLEAN MODE) > 0", [$search]);
                    $query->orWhereRaw("skills.name like ?", ['%' . $request->q . '%']);
                })
                ->orderBy("score")
                ->distinct("pages.id")
                ->whereHas("user", function ($query) {
                    return $query->where("active", true);
                })
                ->paginate(20);
            SEOTools::setTitle("جستجو برای " . $request->q);
            SEOTools::setDescription("نتایج جستجو برای $request->q در ترنوبو");
            SEOTools::setCanonical(\Illuminate\Support\Facades\URL::current() . "?q=$request->q");
            foreach ($users as $user) {
                SEOTools::metatags()->addKeyword($user->name);
                SEOTools::addImages($user->profile);
            }
            $users->appends(['q' => $request->q]);
            $results = $users;
        }
        SearchSuggestion::query()->where("name", $request->q)->firstOrCreate(array("name" => $request->q));
        return $results;
    }

    public function search(Request $request)
    {
        $pages = Page::getSuggestions();
        if ($request->has("q") && strlen($request->q) < 1) {
            if ($request->isMethod("POST")) {
                return response()->json(array("result" => true, "pages" => []));
            } else {
                return redirect("/");
            }
        }
        $search = "";
        if ($request->has("q")) {
            $search = $this->generateSearch(explode(" ", $request->q));
            if ($request->isMethod("POST")) {
                $result = array();
                $suggestions = SearchSuggestion::query()->whereRaw("name like ?", ['%' . $request->q . '%'])->limit(10)->get();
                foreach ($suggestions as $value) {
                    $result[] = $value->name;
                }
                return response()->json(array("result" => true, "suggestions" => $result));
            }
            return Inertia::render("Search", array("pages" => $pages, "results" => $this->handleGetSearch($request), "search" => $request->q, "pages" => $pages, "content" => ($request->has("type") && $request->type === "content")));
        }
        return abort(404);
    }

    public function bookmarks()
    {
        $bookmarks = Bookmark::with("post")
            ->with("post.page")
            ->with("post.likes")
            ->with("post.mutualLikes")
            ->with("post.category")
            ->where("user_id", Auth::user()->id)->latest()->paginate(10);
        return Inertia::render("Bookmarks", array("posts" => $bookmarks));
    }

    public function setLocale(Request $request)
    {
        if ($request->has("locale")) {
            app()->setLocale($request->input("locale"));
            session()->put("locale", $request->input("locale"));
            return response()->json(array("result" => app()->getLocale($request->input("locale"))));
        }
    }

    public function tag($name)
    {
        SEOTools::setTitle("برچسب " . $name);
        SEOTools::setDescription("مطالب منتشر شده با برچسب " . $name);
        SEOTools::opengraph()->setUrl(url("/tags/" . $name));
        SEOTools::setCanonical(url("/tags/" . $name));
        SEOMeta::addKeyword([$name]);

        $posts = Post::query()
            ->distinct("posts.id")
            ->with("page")
            ->with("likes")
            ->with("mutualLikes")
            ->with("category")
            ->whereJsonContains('tags', $name)
            ->paginate(10);
        return Inertia::render('Tags', array("posts" => $posts));
    }

    public function redirecthome()
    {
        return redirect("/feed");
    }

}
