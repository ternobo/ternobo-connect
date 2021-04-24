<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class DonationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            "id" => $this->id,
            "post_id" => $this->post_id,
            "amount" => $this->amount,
            "anonymous" => $this->anonymous,
            "user_id" => $this->when(!$this->anonymous || $this->user_id == Auth::user()->id, $this->user_id),
            "user" => $this->when(!$this->anonymous, $this->user),
            "donate_by_me" => $this->user_id == Auth::user()->id,
            'created_at' => $this->created_at,
        ];
    }
}
