<?php

namespace App\Http\Resources\Content;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\CommunityTag;

class TagResource extends JsonResource
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
            "community" => $community,
        ];
    }
}
