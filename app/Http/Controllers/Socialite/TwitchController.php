<?php

namespace App\Http\Controllers\Socialite;

use App\Events\ReloadSocialOptions;
use App\Http\Controllers\Controller;
use App\Models\ConnectedAccount;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class TwitchController extends Controller
{
    public function login()
    {
        return Socialite::driver('twitch')
            ->with(['user' => Auth::user()->id])
            ->redirect();
    }

    public function callback()
    {
        ConnectedAccount::query()->where("user_id", Auth::user()->id)->where("driver", "twitch")->delete();

        try {
            $user = Socialite::driver('twitch')->user();
            ConnectedAccount::create([
                'name' => $user->name,
                'driver' => 'twitch',
                'token' => $user->token,
                'user_id' => Auth::user()->id,
                'expiresIn' => "9000",
                'meta' => [
                    'value' => $user->nickname,
                    'email' => $user->email,
                    'id' => $user->id,
                ],
            ]);
            event(new ReloadSocialOptions(Auth::user()));
            return view("onOAuthDone");
        } catch (\Throwable $th) {
            return view("onOAuthFaild");
        }

    }
}
