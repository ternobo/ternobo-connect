<?php

namespace App\Services\Admin;

use App\Models\CommunityCategory;
use Illuminate\Support\Str;
use App\Services\Content\CommunityTagService;
use App\Models\CommunityTag;
use App\Models\Tag;

class CommunityTagsManagementService extends CommunityTagService
{

    /**
     * 
     * @param string $tag - tag name (it will create a tag if it's not exits)
     * @param string $cover - community page cover (url)
     * @param string $icon - community tag icon (url)
     * @param string $category - community category
     * 
     * @return App\Models\CommunityTag
     */
    public function addCommunityTag(string $tag, string $cover, string $icon, string $category): CommunityTag
    {

        return CommunityTag::query()->create([
            'name' => "$tag",
            'tag_id' => Tag::query()->firstOrCreate(['name' => $tag])->id,
            'icon' => $icon,
            'cover' => $cover,
            'community_category_id' => CommunityCategory::query()->where("name", $category)->first()->id
        ]);
    }


    /**
     * 
     * @param string $name - community tag name
     * 
     * @return App\Models\CommunityCategory
     */
    public function createCommunityCategory(string $name, string $icon)
    {
        return CommunityTag::query()->create([
            'name' => "$name",
            'icon' => $icon,
        ]);
    }

    /**
     * Get All community categories
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function getCommunityCategories()
    {
        return CommunityCategory::query()->paginate(10);
    }


    /**
     * Get All community tags
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function getCommunityTags()
    {
        return CommunityTag::query()->with("category")->paginate(10);
    }
}
