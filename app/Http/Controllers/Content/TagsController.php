<?php

namespace App\Http\Controllers\Content;

use Ternobo\TernoboWire\TernoboWire;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\App;
use Illuminate\Http\Request;
use Artesaos\SEOTools\Facades\SEOTools;
use Artesaos\SEOTools\Facades\SEOMeta;
use App\Ternobo;
use App\Services\Content\CommunityTagService;
use App\Models\Tag;
use App\Models\Post;
use App\Models\Following;
use App\Models\CommunityTranslation;
use App\Models\CommunityTag;
use App\Http\Controllers\Controller;
use App\Http\Resources\Content\PostResource;
use App\Http\Resources\Content\TagResource;

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

        $tag =  Tag::query()->where("name", $name)->first();

        $posts = PostResource::collection($tag->posts()
            ->with(["page", 'likes', 'mutualLikes', 'category', 'slides', "slides.content"])
            ->paginate(10))
            ->response()
            ->getData();

        $followed = false;
        if ($tag instanceof Tag) {
            $followed = Ternobo::isUserLogedIn() ?
                Following::tags()->where("page_id", Ternobo::currentPage()->id)
                ->where("following", $tag->id)->exists() : false;
        }

        $community = $this->service->getCommunityByHashtag($name);

        return TernoboWire::render('Tags', ["posts" => $posts, 'tag' => $name, "followed" => $followed, "community" => $community]);
    }

    public function getTag(Request $request)
    {
        if ($request->filled("tag")) {
            $tag = Tag::query()->where("name", $request->tag)->first();
            return $this->generateResponse($tag instanceof Tag, $tag instanceof Tag ? TagResource::make() : null);
        }
        return abort(400);
    }

    public function search(Request $request)
    {
        $term = trim($request->q);
        $tags = Tag::query();
        if (empty($term)) {
            $tags = $tags->latest()->limit(10)->get();
        } else {
            $tags = $tags->where("name", "like", "$term%")->latest()->limit(10)->get();
        }
        return $this->generateResponse(true, TagResource::collection($tags));
    }


    public function toggleFollowTag($tag)
    {
        $tag = Tag::query()->where("name", $tag)->firstOrFail()->id;
        $following = Following::tags()->where("page_id", Ternobo::currentPage()->id)->where("following", $tag)->delete() > 0;
        if ($following) {
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
