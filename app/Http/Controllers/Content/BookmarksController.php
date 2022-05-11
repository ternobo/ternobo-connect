<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Models\Bookmark;
use App\Models\Post;
use Artesaos\SEOTools\Facades\SEOTools;
use Illuminate\Support\Facades\Auth;
use Ternobo\TernoboWire\TernoboWire;

class BookmarksController extends Controller
{

    public function bookmarks()
    {
        SEOTools::setTitle("Bookmarks");
        $bookmarks = Bookmark::query()
            ->with("post")
            ->where("user_id", Auth::user()->id)->latest()->paginate(10);
        return TernoboWire::render("Bookmarks", array("posts" => $bookmarks));
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
}
