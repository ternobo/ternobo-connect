<?php

namespace App\Http\Controllers\Socialite;

use App\Events\ReloadSocialOptions;
use App\Http\Controllers\Controller;
use App\Models\ConnectedAccount;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class FacebookController extends Controller
{
    public function login()
    {
        return Socialite::driver('facebook')
            ->with(['user' => Auth::user()->id])
            ->redirect();
    }

    private function parse_signed_request($signed_request)
    {
        list($encoded_sig, $payload) = explode('.', $signed_request, 2);

        $secret = "appsecret"; // Use your app secret here

        // decode the data
        $sig = $this->base64_url_decode($encoded_sig);
        $data = json_decode(base64_url_decode($payload), true);

        // confirm the signature
        $expected_sig = hash_hmac('sha256', $payload, $secret, $raw = true);
        if ($sig !== $expected_sig) {
            return null;
        }

        return $data;
    }

    private function base64_url_decode($input)
    {
        return base64_decode(strtr($input, '-_', '+/'));
    }

    public function delete(Request $request)
    {
        $signed_request = $request->signed_request;
        $data = $this->parse_signed_request($signed_request);
        $user_id = $data['user_id'];

        $account = ConnectedAccount::query()->where(function ($query) {
            $query->where("driver", "facebook")->orWhere("driver", 'instagram');
        })->where("meta->id", $user_id);

        $user = User::find($account->user_id);
        $account->delete();

        $status_url = url("/$user->username"); // URL to track the deletion
        $confirmation_code = random_int(1000, 9999); // unique code for the deletion request

        $data = [
            'url' => $status_url,
            'confirmation_code' => $confirmation_code,
        ];
        return response()->json($data);
    }

    public function callback()
    {
        ConnectedAccount::query()->where("user_id", Auth::user()->id)->where("driver", "facebook")->delete();

        try {
            $user = Socialite::driver('facebook')->user();
            ConnectedAccount::create([
                'name' => $user->name,
                'driver' => 'facebook',
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
