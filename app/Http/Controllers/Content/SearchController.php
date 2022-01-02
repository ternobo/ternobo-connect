<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Models\Post;
use App\Models\SearchSuggestion;
use App\Services\Connection\SuggestionService;
use App\Services\Content\SearchService;
use Artesaos\SEOTools\Facades\SEOTools;
use Illuminate\Http\Request;
use Ternobo\TernoboWire\TernoboWire;

class SearchController extends Controller
{

    private SearchService $service;
    private SuggestionService $suggestionService;

    public function __construct(SearchService $service, SuggestionService $suggestionService)
    {
        $this->service = $service;
        $this->suggestionService = $suggestionService;
    }

    private function handleGetSearch(Request $request)
    {
        $invalid = ['*', ".*", "+", "@"];
        if (in_array($request->q, $invalid)) {
            return abort(400);
        }
        $search = $request->q;
        $results = [];

        // Seo Meta Tags Setup
        SEOTools::setTitle(__("seo.search-for", ['name' => $search]));
        SEOTools::setDescription(__("seo.search-results-for", ['name' => $search]));
        SEOTools::setCanonical(\Illuminate\Support\Facades\URL::current());

        $searchType = $request->input("type", "user");

        if ($searchType == "content") {
            $results = $this->service->searchForContent($search);
        } elseif ($searchType == "tags") {
            $results = $this->service->searchForTags($search);
        } else {
            $results = $this->service->searchForPages($search);

            // Seo for users Search
            foreach ($results->data as $user) {
                SEOTools::metatags()->addKeyword($user['name']);
                SEOTools::addImages($user->profile);
            }
        }

        // Add Search Result To Suggestion
        if (count($results->data) > 0) {
            SearchSuggestion::query()->firstOrCreate(array("name" => $search));
        }

        return $results;
    }

    public function search(Request $request)
    {
        if ($request->filled("q")) {

            if ($request->isMethod("POST")) {
                return response()->json(["result" => true, "suggestions" => $this->service->suggestForSearchAutoComplete($request->input("q", ""))]);
            }

            return TernoboWire::render("Search", [
                "results" => $this->handleGetSearch($request),
                "search" => $request->q,
                "content" => $request->input("type") == "content"
            ]);
        }
        return abort(404);
    }
}
