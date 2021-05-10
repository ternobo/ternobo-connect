<?php

namespace App\Http\Controllers\Socialite;

use App\Http\Controllers\Controller;
use App\Models\ConnectedAccount;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller
{
    public function login()
    {
        return Socialite::driver('google')
            ->with(['user' => Auth::user()->id])
            ->redirect();
    }

    public function callback()
    {
        $user = Socialite::driver('google')->user();
        ConnectedAccount::create([
            'name' => $user->name,
            'driver' => 'google',
            'token' => $user->token,
            'user_id' => Auth::user()->id,
            'expiresIn' => $user->expiresIn,
            'meta' => [
                'email' => $user->email,
                'id' => $user->id,
            ],
        ]);
        return view("onOAuthDone");
    }
}
