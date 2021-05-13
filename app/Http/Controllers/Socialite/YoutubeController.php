<?php

namespace App\Http\Controllers\Socialite;

use App\Http\Controllers\Controller;
use App\Models\ConnectedAccount;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class YoutubeController extends Controller
{
    public function login()
    {
        return Socialite::driver('youtube')
            ->with(['user' => Auth::user()->id])
            ->redirect();
    }

    public function callback()
    {
        ConnectedAccount::query()->where("user_id", Auth::user()->id)->where("driver", "youtube")->delete();
        $user = Socialite::driver('youtube')->user();
        ConnectedAccount::create([
            'name' => $user->nickname,
            'driver' => 'youtube',
            'token' => $user->token,
            'user_id' => Auth::user()->id,
            'expiresIn' => $user->expiresIn,
            'meta' => [
                'value' => $user->nickname,
                'email' => $user->email,
                'id' => $user->id,
            ],
        ]);
        return view("onOAuthDone");
    }
}
