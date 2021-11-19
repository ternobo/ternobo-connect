<?php

namespace App\Http\Controllers\Management;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateCommunityTagRequest;
use App\Models\CommunityCategory;
use App\Models\CommunityTag;
use App\Services\Admin\CommunityTagsManagementService;
use Illuminate\Http\Request;

class CommunityController extends Controller
{
    private CommunityTagsManagementService $service;

    public function __construct(CommunityTagsManagementService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        return $this->generateResponse(true, $this->service->getCommunityTags());
    }

    public function store(CreateCommunityTagRequest $request)
    {
        $CommunityCategory = CommunityCategory::query()->firstOrCreate(['name' => $request->category]);
        $CommunityCategory->icon = $request->community->icon->store("media");
        $communityTag = $this->service->addCommunityTag($request->tag, $request->cover->store("media"), $request->icon->store("media"), $request->category->name);
        return $this->generateResponse($communityTag instanceof CommunityTag, $communityTag);
    }

    public function destroy($id)
    {
        return $this->generateResponse(CommunityTag::query()->where("id", $id)->delete());
    }
}
