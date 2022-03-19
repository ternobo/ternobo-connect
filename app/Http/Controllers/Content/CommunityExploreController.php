<?php

namespace App\Http\Controllers\Content;

use App\Http\Controllers\Controller;
use App\Http\Requests\Community\CommunityExploreRequest;
use App\Http\Resources\CommunityTagResource;
use App\Models\CommunityCategory;
use App\Models\CommunityTag;
use App\Services\Community\CommunityExploreService;
use App\Services\Community\CommunitySortQuery;
use Illuminate\Http\Request;
use Ternobo\TernoboWire\TernoboWire;

class CommunityExploreController extends Controller
{
    private CommunityExploreService $service;

    public function __construct(CommunityExploreService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return TernoboWire::render("CommunityExplore", ['categories' => CommunityCategory::all()]);
    }

    public function get(CommunityExploreRequest $request)
    {
        return $this->generateResponse(true, CommunityTagResource::collection(
            $this->service->getCommunities(new CommunitySortQuery($request->input("sort", "activity")), $request->category, $request->search)
        )->response()->getData());
    }
}
