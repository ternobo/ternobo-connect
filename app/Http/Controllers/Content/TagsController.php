<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Models\CommunityTag;
use App\Models\CommunityTranslation;
use App\Models\Following;
use App\Models\Post;
use App\Models\Tag;
use App\Services\Content\CommunityTagService;
use App\Ternobo;
use Artesaos\SEOTools\Facades\SEOMeta;
use Artesaos\SEOTools\Facades\SEOTools;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Ternobo\TernoboWire\TernoboWire;

class TagsController extends Controller
{

    private CommunityTagService $service;

    public function __construct(CommunityTagService $service)
    {
        $this->service = $service;
    }


    public function index($name)
    {
        SEOTools::setTitle(__("seo.tag", ['tag' => $name]));
        SEOTools::setDescription("مطالب منتشر شده با برچسب " . $name);
        SEOTools::opengraph()->setUrl(url("/tags/" . $name));
        SEOTools::setCanonical(url("/tags/" . $name));
        SEOMeta::addKeyword([$name]);

        $posts = Post::withRelations()
            ->distinct("posts.id")
            ->whereJsonContains('tags', $name)
            ->paginate(10);

        $followed = Ternobo::isUserLogedIn() ?
            Following::tags()->where("page_id", Ternobo::currentPage()->id)
            ->where("following", Tag::query()->where("name", $name)->first()->id)->exists() : false;

        $community = $this->service->getCommunityByHashtag($name);

        return TernoboWire::render('Tags', ["posts" => $posts, 'tag' => $name, "followed" => $followed, "community" => $community]);
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
            'following' => Tag::query()->where("name", $tag)->first()->id,
            'type' => "tag",
        ]);
        return response()->json(['result' => true, 'follow' => true, "following" => $following]);
    }
}
