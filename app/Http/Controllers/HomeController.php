<?php

namespace App\Http\Controllers;

use App\Models\Bookmark;
use App\Models\Following;
use App\Models\Page;
use App\Models\Post;
use App\Models\SearchSuggestion;
use Artesaos\SEOTools\Facades\SEOMeta;
use Artesaos\SEOTools\Facades\SEOTools;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{

    private function getSuggestions()
    {
        $pages = array();
        if (Auth::check()) {
            $user = Auth::user();
            if (count(Auth::user()->followings) > 0) {
                $pages = Following::query()
                    ->distinct("pages.id")
                    ->join("pages", "pages.id", "=", "followings.following")
                    ->whereRaw("followings.user_id IN (SELECT following from followings where user_id='$user->id')")
                    ->whereRaw("followings.following NOT IN (SELECT following from followings where user_id='$user->id')")
                    ->where("pages.user_id", "!=", Auth::user()->id)
                    ->select(array("pages.*"))
                    ->get();

                if (count($pages) > 5) {
                    $pages = $pages->random(5);
                } else {
                    if (count(Page::all()) > 5) {
                        $pages = Page::query()
                            ->distinct("pages.id")
                            ->where("pages.user_id", "!=", Auth::user()->id)
                            ->get()->random(5);
                    }
                }
            } else {
                if (count(Page::all()) > 5) {
                    $pages = Page::query()
                        ->distinct("pages.id")
                        ->where("pages.user_id", "!=", Auth::user()->id)
                        ->get()->random(5);
                }
            }
        }
        $result = array();
        foreach ($pages as $page) {
            if (!(($user->isFollowing($page->user_id) instanceof Following) || ($user->isConnected($page->user_id) instanceof \App\Connection))) {
                $result[] = $page;
            }
        }
        return $result;
    }

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
        $pages = $this->getSuggestions();
        $posts = Post::query()
            ->join("users", "posts.user_id", "=", "users.id")
            ->leftJoin("categories", "categories.id", "=", "posts.category_id")
            ->leftJoin("content_seens", function ($join) {
                $join->on("posts.id", "=", "content_seens.post_id")->where("content_seens.user_id", Auth::user()->id);
            })
            ->select(array("posts.*", "categories.name as category_name",
                "users.name as user_name", "users.short_bio as short_bio",
                "users.profile as profile",
                "content_seens.created_at as seen_at"))
            ->whereRaw("(posts.user_id IN (select following from followings WHERE user_id = '" . Auth::user()->id . "' ) or `posts`.`user_id` = '" . Auth::user()->id . "')")
            ->whereRaw("IF(posts.show = 'private' AND (NOT EXISTS(SELECT * FROM connections where "
                . "(connection = '" . Auth::user()->id . "' and user_id=posts.user_id)"
                . "OR "
                . "(user_id = '" . Auth::user()->id . "' and connection=posts.user_id)"
                . ")"
                . ")"
                . ",'TRUE','FALSE') = 'FALSE'")
            ->where("users.active", true)
            ->orderByRaw("seen_at IS NULL DESC, seen_at DESC")
            ->paginate(10);

        return view('home', array("posts" => $posts, "pages" => $pages));
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
                ->selectRaw("MATCH (`title`, `text`) AGAINST('$search' IN BOOLEAN MODE) as score, posts.*")
                ->whereRaw("MATCH (`title`, `text`) AGAINST('$search' IN BOOLEAN MODE) > 0")
                ->orderBy("score")
                ->distinct("posts.id");


            $posts->whereHas("user", function ($query) {
                $query->where("active", true);
            });

            SEOTools::setTitle("جستجو برای " . $request->q);
            SEOTools::setDescription("نتایج جستجو برای $request->q در ترنوبو");
            SEOTools::setCanonical(\Illuminate\Support\Facades\URL::current() . "?q=$request->q&type=content");
            $results = $posts->paginate(10);
            $results->appends(['q' => $request->q, "type" => "content"]);
        } else {
            $users = Page::query()
                ->leftJoin("skills", "skills.user_id", "pages.user_id")
                ->selectRaw("MATCH (pages.name,short_bio,about,slug,location) AGAINST('$search' IN BOOLEAN MODE) as score, pages.*")
                ->where(function ($query) use ($search, $request) {
                    $query->whereRaw("MATCH (pages.name,short_bio,about,slug,location) AGAINST('$search' IN BOOLEAN MODE) > 0");
                    $query->orWhereRaw("skills.name like '%$request->q%'");
                })
                ->orderBy("score")
                ->distinct("pages.id")
                ->whereHas("user", function ($query) {
                    return $query->where("active", true);
                })
                ->paginate(10);
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
        $pages = $this->getSuggestions();
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
                $suggestions = SearchSuggestion::query()->whereRaw("name like '%$request->q%'")->limit(10)->get();
                foreach ($suggestions as $value) {
                    $result[] = $value->name;
                }
                return response()->json(array("result" => true, "pages" => $result));
            }
            return view("search", array("pages" => $pages, "results" => $this->handleGetSearch($request), "search" => $request->q, "pages" => $pages, "content" => ($request->has("type") && $request->type === "content")));
        }
        return abort(404);
    }

    public function bookmarks()
    {
        $bookmarks = Bookmark::where("user_id", Auth::user()->id)->latest()->paginate(10);
        return view("bookmarks", array("bookmarks" => $bookmarks));
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
            ->join("users", "posts.user_id", "=", "users.id")
            ->leftJoin("categories", "categories.id", "=", "posts.category_id")
            ->leftJoin("content_seens", "posts.id", "=", "content_seens.post_id")
            ->select(array("posts.*", "categories.name as category_name", "users.name as user_name", "users.short_bio as short_bio", "users.profile as profile", "content_seens.created_at as seen_at"))
            ->whereJsonContains('tags', $name)
            ->paginate(10);
        return view('tag', array("posts" => $posts));
    }

    public function redirecthome()
    {
        return redirect("/feed");
    }

}
