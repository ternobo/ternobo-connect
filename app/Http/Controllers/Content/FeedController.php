<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Ternobo\TernoboWire\TernoboWire;

class FeedController extends Controller
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
            ->leftJoin("content_seens", function ($join) {
                $join->on("posts.id", "=", "content_seens.post_id")->where("content_seens.user_id", Auth::user()->id);
            })
            ->select(array("posts.*", "content_seens.created_at as seen_at"))
            ->where(function ($query) {
                $query->whereRaw("(posts.page_id IN (select following from followings WHERE user_id = '" . Auth::user()->id . "' ) or `posts`.`user_id` = '" . Auth::user()->id . "')");
                // ->orWhere()
            })
            ->whereHas("page.user", function ($query) {
                $query->where("active", true);
            })
            ->orderByRaw("posts.user_id = '" . Auth::user()->id . "' AND seen_at IS NULL DESC ,seen_at IS NULL DESC, seen_at DESC, posts.created_at")
            ->distinct("posts.id")
            ->paginate(10);

        return TernoboWire::render("Feed", array("posts" => $posts, "pages" => $pages));
    }
}
