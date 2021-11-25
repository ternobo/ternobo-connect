<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Models\CommunityCategory;
use App\Models\Following;
use App\Models\Tag;
use App\Models\UserOption;
use App\Services\Content\CommunityTagService;
use App\Ternobo;
use Illuminate\Http\Request;
use Ternobo\TernoboWire\TernoboWire;

class CommunityTagController extends Controller
{
    private CommunityTagService $service;

    public function __construct(CommunityTagService $service)
    {
        $this->service = $service;

        $this->middleware('auth')->only(['interestsPages', "setInterests", "skipInterestPage"]);
    }

    public function interestsPages()
    {
        if (filter_var(UserOption::getOption("skip_interests", false), FILTER_VALIDATE_BOOLEAN) || !Ternobo::currentPage()->visible) {
            return redirect("/feed");
        }

        $communities = CommunityCategory::query()->with(['tags'])->orderBy("sort", "ASC")->get();
        return TernoboWire::render("InterestsSelect", ["communities" => $communities]);
    }

    public function setInterests(Request $request)
    {
        $interests = $request->interests;
        foreach ($interests as $interest) {
            $following = Following::create([
                'page_id' => Ternobo::currentPage()->id,
                'following' => Tag::query()->where("name", $interest)->first()->id,
                'type' => "tag",
            ]);
        }
        UserOption::setOption("skip_interests", true);
        return $this->generateResponse(true);
    }

    public function skipInterestPage()
    {
        UserOption::setOption("skip_interests", true);
        return $this->generateResponse(true);
    }

    public function getHashtagTopUsers($tag)
    {
        return $this->generateResponse(true, $this->service->getHashtagTopUsers($tag));
    }

    public function getRelatedTags($tag)
    {
        return $this->generateResponse(true, $this->service->getRelatedTags($tag)['data']);
    }
}
