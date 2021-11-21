<?php

namespace App\Http\Controllers\Admin\Community;

use App\Http\Controllers\Controller;
use App\Http\Requests\CommunityManagement\AddTranslationRequest;
use App\Http\Requests\CreateCommunityCategoryRequest;
use App\Http\Requests\CreateCommunityTagRequest;
use App\Http\Requests\UpdateCommunityTagRequest;
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
        $communityTag = $this->service->addCommunityTag($request->tag, $request->cover->store("media"), $request->icon->store("media"), $request->category_id);
        return $this->generateResponse($communityTag instanceof CommunityTag, $communityTag);
    }

    public function addTranslation(AddTranslationRequest $request)
    {
        return $this->generateResponse(true, $this->service->addCommunityTagTranslation($request->tag, $request->translation, $request->locale));
    }

    public function deleteTranslation(AddTranslationRequest $request)
    {
        return $this->generateResponse(true, $this->service->addCommunityTagTranslation($request->tag, $request->translation, $request->locale));
    }

    public function update($id, UpdateCommunityTagRequest $request)
    {
        return $this->generateResponse(CommunityTag::query()->where("id", $id)->update([$request->all()]));
    }

    public function destroy($id)
    {
        return $this->generateResponse(CommunityTag::query()->where("id", $id)->delete() > 0);
    }
}
