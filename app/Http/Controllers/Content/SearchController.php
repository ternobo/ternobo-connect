<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Models\Post;
use App\Models\SearchSuggestion;
use Artesaos\SEOTools\Facades\SEOTools;
use Illuminate\Http\Request;
use Ternobo\TernoboWire\TernoboWire;

class SearchController extends Controller
{

    private function generateSearch($search)
    {
        $first = true;
        $result = "";
        $replaces = array("ـ" => "_");
        foreach ($search as $keyword) {
            foreach ($replaces as $key => $value) {
                $keyword = str_replace($key, mb_convert_encoding($value, 'UTF-8'), $keyword);
            }
            $search = preg_replace('/[+\-><\(\)~*\"@#]+/', ' ', preg_replace('/[^\p{L}\p{N}_]+/u', ' ', $keyword));
            if ($first) {
                $result .= "+$search*";
                $first = false;
            } else {
                $result .= " +$search*";
            }
        }
        return $result;
    }

    private function handleGetSearch(Request $request)
    {
        $invalid = ['*', ".*", "+", "@"];
        if (in_array($request->q, $invalid)) {
            return abort(400);
        }
        $search = $this->generateSearch(explode(" ", $request->q));
        $results = array();

        if ($request->has("type") && $request->type === "content") {
            $posts = Post::withRelations()
                ->with(["page", "slides.content" => function ($query) use ($search) {
                    $query->selectRaw("MATCH (`content`) AGAINST(? IN BOOLEAN MODE) as score", [$search])
                        ->orderBy("score");
                }, "mutualLikes", "category"])
                ->selectRaw("MATCH (`title`, `text`) AGAINST(? IN BOOLEAN MODE) as score, posts.*", [$search])
                ->whereRaw("MATCH (`title`, `text`) AGAINST(? IN BOOLEAN MODE) > 0", [$search])
                ->orWhereHas("content", function ($query) use ($search) {
                    $query->whereRaw("MATCH (`content`) AGAINST(? IN BOOLEAN MODE) > 0", [$search]);
                })
                ->orWhereJsonContains("tags", $search)
                ->orderBy("score")
                ->distinct("posts.id");

            SEOTools::setTitle(__("seo.search-for", ['name' => $request->q]));
            SEOTools::setDescription(__("seo.search-results-for", ['name' => $request->q]));
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
                ->where("visible", true)
                ->orderBy("score")
                ->distinct("pages.id")
                ->whereHas("user", function ($query) {
                    return $query->where("active", true);
                })
                ->paginate(20);
            SEOTools::setTitle(__("seo.search-for", ['name' => $request->q]));
            SEOTools::setDescription(__("seo.search-results-for", ['name' => $request->q]));
            SEOTools::setCanonical(\Illuminate\Support\Facades\URL::current() . "?q=$request->q");
            foreach ($users as $user) {
                SEOTools::metatags()->addKeyword($user->name);
                SEOTools::addImages($user->profile);
            }
            $users->appends(['q' => $request->q]);
            $results = $users;
        }
        if (count($results) > 0) {
            SearchSuggestion::query()->where("name", $request->q)->firstOrCreate(array("name" => $request->q));
        }
        return $results;
    }

    public function search(Request $request)
    {
        $pages = Page::getSuggestions();
        if ($request->has("q") && strlen($request->q) < 1) {
            if ($request->isMethod("POST")) {
                return response()->json(array("result" => true, "suggestions" => []));
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
            return TernoboWire::render("Search", array("pages" => $pages, "results" => $this->handleGetSearch($request), "search" => $request->q, "pages" => $pages, "content" => ($request->has("type") && $request->type === "content")));
        }
        return abort(404);
    }
}
