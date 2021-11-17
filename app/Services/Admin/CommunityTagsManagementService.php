<?php

namespace App\Services\Admin;

use Illuminate\Support\Str;
use App\Services\Content\CommunityTagService;
use App\Models\CommunityTag;
use App\Models\Tag;

class CommunityTagsManagementService extends CommunityTagService
{

    /**
     * 
     * @param string $tag - tag name (it will create a tag if it's not exits)
     * @param string $name - community tag name
     * @param string $cover - community page cover (url)
     * @param string $icon - community tag icon (url)
     * 
     * @return App\Models\CommunityTag
     */
    public function addCommunityTag(string $tag, string $cover, string $icon): CommunityTag
    {

        return CommunityTag::query()->create([
            'name' => "#$tag",
            'tag_id' => Tag::query()->firstOrCreate(['name' => $tag])->id,
            'icon' => $icon,
            'cover' => $cover
        ]);
    }

    /**
     * Get All community tags
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function getCommunityTags()
    {
        return CommunityTag::all();
    }
}
