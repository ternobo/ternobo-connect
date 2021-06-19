<?php

namespace App\Http\Controllers\Socialite;

use App\Events\ReloadSocialOptions;
use App\Http\Controllers\Controller;
use App\Models\ConnectedAccount;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class DribbbleController extends Controller
{
    public function login()
    {
        return Socialite::driver('dribbble')
            ->with(['user' => Auth::user()->id])
            ->redirect();
    }

    public function callback()
    {
        ConnectedAccount::query()->where("user_id", Auth::user()->id)->where("driver", "dribbble")->delete();

        try {
            $user = Socialite::driver('dribbble')->user();
            ConnectedAccount::create([
                'name' => $user->name,
                'driver' => 'dribbble',
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
