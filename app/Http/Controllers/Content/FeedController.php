<?php

namespace App\Http\Controllers\Content;

use Ternobo\TernoboWire\TernoboWire;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Ternobo;
use App\Services\Content\ContentService;
use App\Services\Connection\SuggestionService;
use App\Models\Post;
use App\Models\Page;
use App\Models\Following;
use App\Http\Controllers\Controller;
use Artesaos\SEOTools\Facades\SEOTools;

class FeedController extends Controller
{

    private ContentService $contentService;
    private SuggestionService $suggestionService;

    public function __construct(ContentService $contentService, SuggestionService $suggestionService)
    {
        $this->contentService = $contentService;
        $this->suggestionService = $suggestionService;
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Request $request)
    {
        SEOTools::setTitle("Feed");
        $user = Auth::user();
        $pages = $this->suggestionService->getSuggestions($user);
        $posts = $this->contentService->getFeedPosts(Ternobo::currentPage(), $user);

        return TernoboWire::render("Feed", ["posts" => $posts, "pages" => $pages]);
    }
}
