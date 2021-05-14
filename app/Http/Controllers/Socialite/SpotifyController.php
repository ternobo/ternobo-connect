<?php

namespace App\Http\Controllers\Socialite;

use App\Http\Controllers\Controller;
use App\Models\ConnectedAccount;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SpotifyController extends Controller
{
    public function login()
    {
        return Socialite::driver('spotify')
            ->with(['user' => Auth::user()->id])
            ->redirect();
    }

    public function callback()
    {
        ConnectedAccount::query()->where("user_id", Auth::user()->id)->where("driver", "spotify")->delete();
        $user = Socialite::driver('spotify')->user();
        ConnectedAccount::create([
            'name' => $user->name,
            'driver' => 'spotify',
            'token' => $user->token,
            'user_id' => Auth::user()->id,
            'expiresIn' => "9000",
            'meta' => [
                'value' => $user->nickname,
                'email' => $user->email,
                'id' => $user->id,
            ],
        ]);
        dd($user);
        event(new ReloadSocialOptions(Auth::user()));
        return view("onOAuthDone");
    }
}
