<?php

namespace App\Http\Controllers\Admin\Community;

use App\Http\Controllers\Controller;
use App\Http\Requests\CommunityManagement\AddTranslationRequest;
use App\Http\Requests\CreateCommunityCategoryRequest;
use App\Http\Requests\CreateCommunityTagRequest;
use App\Http\Requests\UpdateCommunityTagRequest;
use App\Models\CommunityCategory;
use App\Models\CommunityTag;
use App\Models\Post;
use App\Services\Admin\CommunityTagsManagementService;
use App\Utils\Uploader;
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

    public function show($communityTag)
    {
        $communityTag = CommunityTag::query()->findOrFail($communityTag);
        $post_count = Post::query()->whereJsonContains("tags", $communityTag->tag->name)->count();
        return $this->generateResponse(true, ['community' => $communityTag, "postCount" => $post_count]);
    }


    public function store(CreateCommunityTagRequest $request)
    {
        $communityTag = $this->service->addCommunityTag(
            $request->tag,
            $request->filled("cover") ? Uploader::resizeCover($request->cover->store("media")) : null,
            Uploader::resizeIcon($request->icon->store("media")),
            $request->category_id
        );
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
        return $this->generateResponse($this->service->updateCommunityTag($id, $request->only("icon", "cover")));
    }

    public function destroy($id)
    {

        return $this->generateResponse(CommunityTag::query()->where("id", $id)->delete() > 0);
    }
}
