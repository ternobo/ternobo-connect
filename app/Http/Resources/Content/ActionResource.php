<?php

namespace App\Http\Resources\Content;

use App\Models\Post;
use Illuminate\Http\Resources\Json\JsonResource;

class ActionResource extends JsonResource
{
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
            "action" => $this->action,
            "post" => PostResource::make(Post::find($this->post_id))
        ];
    }
}
