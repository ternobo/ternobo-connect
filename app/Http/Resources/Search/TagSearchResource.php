<?php

namespace App\Http\Resources\Search;

use App\Models\CommunityTag;
use App\Models\Following;
use App\Ternobo;
use Illuminate\Http\Resources\Json\JsonResource;

class TagSearchResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $community = CommunityTag::query()->where("tag_id", $this->id)->first();
        return [
            "id" => $this->id,
            "tag" => $this->name,
            "is_community_tag" => $community instanceof CommunityTag,
            "is_followed" => Ternobo::currentPage() ? Following::tags()->where("page_id", Ternobo::currentPage()->id)->where("following", $this->id)->exists() : false,
            "community" => $community,
        ];
    }
}
