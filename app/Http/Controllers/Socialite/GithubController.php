<?php

namespace App\Http\Controllers\Socialite;

use App\Http\Controllers\Controller;
use App\Models\ConnectedAccount;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class GithubController extends Controller
{public function login()
    {
    return Socialite::driver('github')
        ->with(['user' => Auth::user()->id])
        ->redirect();
}

    public function callback()
    {
        ConnectedAccount::query()->where("user_id", Auth::user()->id)->where("driver", "github")->delete();
        $user = Socialite::driver('github')->user();
        ConnectedAccount::create([
            'name' => $user->name,
            'driver' => 'github',
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
