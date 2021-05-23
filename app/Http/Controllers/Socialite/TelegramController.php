<?php

namespace App\Http\Controllers\Socialite;

use App\Events\ReloadSocialOptions;
use App\Http\Controllers\Controller;
use App\Models\ConnectedAccount;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class TelegramController extends Controller
{
    public function login()
    {
        return view("telegram-login");
    }

    public function callback()
    {
        ConnectedAccount::query()->where("user_id", Auth::user()->id)->where("driver", "telegram")->delete();
        $user = Socialite::driver('telegram')->user();
        ConnectedAccount::create([
            'name' => $user->name,
            'driver' => 'telegram',
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
    }
}
