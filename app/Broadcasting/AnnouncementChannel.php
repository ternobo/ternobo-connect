<?php

namespace App\Broadcasting;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AnnouncementChannel
{

    /**
     * Authenticate the user's access to the channel.
     *
     * @param  \App\Models\User  $user
     * @return array|bool
     */
    public function join(User $user)
    {
        return $user->id == Auth::user()->id;
    }
}
