<?php

namespace App\Http\Resources;

use App\Models\CommunityTranslation;
use App\Models\Following;
use App\Ternobo;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\App;

class CommunityTagResource extends BaseResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $locale = App::getLocale();

        $translation = CommunityTranslation::query()->where("tag", $this->name)->where("locale", $locale)->first();

        return [
            "community_category_id" => $this->community_category_id,
            "cover" =>  $this->cover,
            "icon" =>  $this->icon,
            "id" =>  $this->id,
            "name" =>  $translation instanceof CommunityTranslation ? $translation->translation : $this->name,
            "show_in_interst_page" =>  $this->show_in_interst_page,
            "tag" =>  $this->tag->name,
            "is_followed" => Ternobo::currentPage() ? Following::tags()->where("page_id", Ternobo::currentPage()->id)->where("following", $this->tag_id)->exists() : false,
        ];
    }
}
