<?php

namespace App\Http\Controllers\Socialite;

use App\Events\ReloadSocialOptions;
use App\Http\Controllers\Controller;
use App\Models\ConnectedAccount;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Laravel\Socialite\Facades\Socialite;

class RedditController extends Controller
{
    public function login()
    {
        return Socialite::driver('reddit')
            ->with(['user' => Auth::user()->id])
            ->redirect();
    }

    public function callback()
    {
        ConnectedAccount::query()->where("user_id", Auth::user()->id)->where("driver", "reddit")->delete();

        try {
            $user = Socialite::driver('reddit')->user();
            ConnectedAccount::create([
                'name' => $user->nickname,
                'driver' => 'reddit',
                'token' => $user->token,
                'user_id' => Auth::user()->id,
                'expiresIn' => "9000",
                'meta' => [
                    'value' => $user->nickname,
                    'avatar' => $user->avatar,
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
