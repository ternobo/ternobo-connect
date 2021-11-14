<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Models\Following;
use App\Models\Page;
use App\Models\Post;
use App\Services\Connection\SuggestionService;
use App\Services\Content\ContentService;
use App\Ternobo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Ternobo\TernoboWire\TernoboWire;

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
        $user = Auth::user();
        $pages = $this->suggestionService->getSuggestions($user);
        $posts = $this->contentService->getFeedPosts(Ternobo::currentPage(), $user);
        return TernoboWire::render("Feed", ["posts" => $posts, "pages" => $pages]);
    }
}
