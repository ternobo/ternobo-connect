<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Models\Post;
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
        return TernoboWire::render('Tags', ["posts" => $posts, 'tag' => $name]);
    }

    public function toggleFollowTag($tag)
    {
        // TODO
    }

}
