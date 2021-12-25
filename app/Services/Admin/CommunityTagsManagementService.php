<?php

namespace App\Services\Admin;

use App\Models\CommunityCategory;
use Illuminate\Support\Str;
use App\Services\Content\CommunityTagService;
use App\Models\CommunityTag;
use App\Models\CommunityTranslation;
use App\Models\Tag;
use App\Utils\Uploader;
use Illuminate\Support\Facades\Storage;

class CommunityTagsManagementService extends CommunityTagService
{

    /**
     * 
     * @param string $tag - tag name (it will create a tag if it's not exits)
     * @param string $cover - community page cover (url)
     * @param string $icon - community tag icon (url)
     * @param $category - community category
     * 
     * @return App\Models\CommunityTag
     */
    public function addCommunityTag(string $tag, ?string $cover, string $icon, $category_id): CommunityTag
    {

        return CommunityTag::query()->create([
            'name' => "$tag",
            'tag_id' => Tag::query()->firstOrCreate(['name' => $tag])->id,
            'icon' => $icon,
            'cover' => isset($cover) ? $cover : "images/cover.jpg",
            'community_category_id' => $category_id
        ]);
    }


    public function addCommunityTagTranslation(string $tag, string $translation, string $locale)
    {
        return CommunityTranslation::query()->firstOrCreate([
            'tag' => $tag,
            'translation' => $translation,
            'locale' => $locale,
        ]);
    }


    public function getCommunityTagTranslations(string $tag)
    {
        return CommunityTranslation::query()
            ->where("tag", $tag)
            ->get();
    }

    public function deleteCommunityTagTranslation(string $tag, string $locale)
    {
        return CommunityTranslation::query()
            ->where("tag", $tag)
            ->where("locale", $locale)
            ->delete();
    }

    public function updateCommunityTag($id, array $data)
    {
        $community = CommunityTag::query()->where("id", $id)->first();
        if (isset($data['icon'])) {
            $data['icon'] =  Uploader::resizeIcon($data['icon']->store("media"));
            unlink(Storage::path($community->icon));
        }
        if (isset($data['cover'])) {
            $data['cover'] =  Uploader::resizeCover($data['cover']->store("media"));
            if ($community->cover != "images/cover.jpg") {
                unlink(Storage::path($community->cover));
            }
        }
        return $community->update($data);
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
        return CommunityTag::query()->with(["category", 'transactions'])->get();
    }
}
