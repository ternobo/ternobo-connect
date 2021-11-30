<?php

namespace App\Http\Resources;

use App\Models\User;
use App\Ternobo;
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
        $user = Ternobo::isUserLogedIn() ? Auth::user()->id : '-1';
        return [
            "id" => $this->id,
            "post_id" => $this->post_id,
            "guest" => $this->user_id == null,
            "amount" => $this->amount,
            "anonymous" => $this->anonymous,
            "user_id" => $this->when(!$this->anonymous || $this->user_id == $user || $request->is("/donations"), $this->user_id),
            "user" => $this->when(!$this->anonymous || $request->is("/donations"), $this->user),
            "meta" => $this->when(!$this->anonymous || $request->is("/donations"), $this->meta),
            "donate_by_me" => Ternobo::isUserLogedIn() ? $this->user_id == Auth::user()->id : false,
            'created_at' => $this->created_at,
        ];
    }
}
