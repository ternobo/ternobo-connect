<?php

namespace App\Http\Resources\Content;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Like;
use App\Models\Bookmark;
use App\Ternobo;
use Illuminate\Http\Resources\Json\ResourceResponse;
use Illuminate\Support\Facades\Auth;

class PostResource extends JsonResource
{

    public function toResponse($request)
    {
        return (new ResourceResponse($this))->toResponse($request)->getData();
    }

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            "id" => $this->id,
            "slug" => $this->slug,
            "can_tip" => $this->can_tip,
            "category" => $this->category,
            "created_at" => $this->created_at,
            "is_bookmarked" => Auth::check() ? Bookmark::where("post_id", $this->id)->where("user_id", Auth::user()->id)->exists() : false,
            "is_liked" => Auth::check() ? Like::query()->wherePostId($this->id)->wherePageId(Ternobo::currentPage()->id)->exists() : false,
            "mutual_likes" => $this->mutualLikes,
            "page" => $this->page,
            "blocks" => $this->blocks,
            "tags" => TagResource::collection($this->tags),
            "type" => $this->type
        ];
    }
}
