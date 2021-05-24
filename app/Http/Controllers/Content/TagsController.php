<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Models\Following;
use App\Models\Post;
use App\Ternobo;
use Artesaos\SEOTools\Facades\SEOMeta;
use Artesaos\SEOTools\Facades\SEOTools;
use Ternobo\TernoboWire\TernoboWire;

class TagsController extends Controller
{

    public function index($name)
    {
        SEOTools::setTitle("برچسب " . $name);
        SEOTools::setDescription("مطالب منتشر شده با برچسب " . $name);
        SEOTools::opengraph()->setUrl(url("/tags/" . $name));
        SEOTools::setCanonical(url("/tags/" . $name));
        SEOMeta::addKeyword([$name]);

        $posts = Post::query()
            ->distinct("posts.id")
            ->whereJsonContains('tags', $name)
            ->paginate(10);
        $followed = Following::tags()->where("page_id", Ternobo::currentPage()->id)->where("following", $name)->exists();
        return TernoboWire::render('Tags', ["posts" => $posts, 'tag' => $name, "followed" => $followed]);
    }

    public function toggleFollowTag($tag)
    {
        $following = Following::tags()->where("page_id", Ternobo::currentPage()->id)->where("following", $tag)->first();
        if ($following != null) {
            $following->delete();
            return response()->json(['result' => true, 'follow' => false]);
        }
        $following = Following::create([
            'page_id' => Ternobo::currentPage()->id,
            'following' => $tag,
            'type' => "tag",
        ]);
        return response()->json(['result' => true, 'follow' => true, "following" => $following]);
    }

}
