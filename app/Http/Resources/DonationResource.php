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
            "user_id" => $this->when(!$this->anonymous || $this->user_id == Auth::user()->id || $request->is("/donations"), $this->user_id),
            "user" => $this->when(!$this->anonymous || $request->is("/donations"), $this->user),
            "meta" => $this->when(!$this->anonymous || $request->is("/donations"), $this->meta),
            "donate_by_me" => Auth::check() ? $this->user_id == Auth::user()->id : false,
            'created_at' => $this->created_at,
        ];
    }
}
