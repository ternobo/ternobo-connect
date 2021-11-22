<?php

namespace App\Http\Controllers\Admin\Community;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateCommunityCategoryRequest;
use App\Models\CommunityCategory;
use Illuminate\Http\Request;

class CommunityCategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->generateResponse(true, CommunityCategory::query()->orderBy("sort", "DESC")->get());
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateCommunityCategoryRequest $request)
    {
        $communityCategory = CommunityCategory::query()->firstOrNew(['name' => $request->name]);
        $communityCategory->icon = $request->icon->store("media");
        $communityCategory->save();
        return $this->generateResponse($communityCategory instanceof CommunityCategory, $communityCategory);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CommunityCategory  $communityCategory
     * @return \Illuminate\Http\Response
     */
    public function show(CommunityCategory $communityCategory)
    {
        //
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CommunityCategory  $communityCategory
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CommunityCategory $communityCategory)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CommunityCategory  $communityCategory
     * @return \Illuminate\Http\Response
     */
    public function destroy($communityCategory)
    {
        return $this->generateResponse(CommunityCategory::query()->where("id", $communityCategory)->delete() > 0);
    }
}
