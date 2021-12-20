<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\ActiveSession;
use App\Models\User;
use App\Models\Verification;
use App\SMS;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use PragmaRX\Google2FA\Google2FA;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
     */

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    public function login(Request $request)
    {
        $user = User::where("username", strtolower($request->username))->orWhere("email", strtolower($request->username))->orWhere("phone", strtolower($request->username))->first();
        if ($user !== null) {

            if (!Hash::check($request->password, $user->password)) {
                $exception = ValidationException::withMessages([
                    "password" => [trans('validation.password')],
                ]);
                return response()->json(["result" => false, "errors" => $exception->errors()]);
            }
            if ($user->two_factor) {
                if ($user->two_factor_type == "phone") {
                    $this->sendCodeToPhone($user->phone);
                }

                session()->put("user_to_login", $user);

                return response()->json(["two_factor" => true, 'type' => $user->two_factor_type]);
            } else {
                $user->active = true;
                $user->save();
                Auth::login($user, true);
                ActiveSession::addSession($user->id);


                return response()->json(["result" => true])->cookie("ternobo_current_page_id", $user->personalPage->id, 9999999);
            }
        }
        $exception = ValidationException::withMessages([
            "email" => [trans('validation.login')],
        ]);
        return response()->json(["result" => false, "errors" => $exception->errors()]);
    }

    private function sendCodeToPhone($phone)
    {
        $sms = new SMS($phone);
        if (Str::startsWith($phone, '+98')) {
            $code = random_int(111111, 999999);
            $verification = new Verification();
            $verification->code = $code;
            $verification->phone = $phone;
            $verification->save();

            return $sms->sendUltraFastSMS([SMS::makeParameter("code", $code)], "36529");
        }
        return $sms->globalVerification();
    }

    public function twoFactorVerify(Request $request)
    {
        $user = session()->get("user_to_login");

        if ($request->filled("type") && $request->type == "recovery") {

            $code = $request->code;
            $recoveryCodes = json_decode(User::query()->where("id", $user->id)->first()->two_factor_recovery_codes);
            if (in_array($code, $recoveryCodes)) {
                if (($key = array_search($code, $recoveryCodes)) !== false) {
                    unset($recoveryCodes[$key]);

                    $user->two_factor_recovery_codes = json_encode(array_values($recoveryCodes));
                    Auth::login($user, true);
                    ActiveSession::addSession($user->id);
                    $user->active = true;
                    $user->save();
                    return response()->json([
                        'result' => true,
                    ]);
                }
            } else {
                return response()->json(array("result" => false, "msg" => __("کد بازیابی نامعتبر است!")));
            }
        }

        if ($user->two_factor_type === 'email' || $user->two_factor_type == "phone") {

            if (session()->has("otp_id")) {
                $result = SMS::verifyGlobalAuth($request->code);
                return response()->json([
                    'result' => $result['status'],
                    'msg' => $result['message'],
                ]);
            }

            $verification = $user->two_factor_type == "phone" ?
                Verification::query()->where("code", $request->code)->where("phone", $user->phone)->first()
                : Verification::query()->where("code", $request->code)->where("email", $user->email)->first();
            if ($verification instanceof Verification) {
                Auth::login($user, true);
                ActiveSession::addSession($user->id);
                $user->active = true;
                $user->save();

                return response()->json(array("result" => true));
            } else {
                return response()->json(array("result" => false, "msg" => __("کد تایید نامعتبر است!")));
            }
        } elseif ($user->two_factor_type === 'app') {
            $google2fa = new Google2FA();
            $valid = $google2fa->verifyKey($user->two_factor_secret, $request->code);
            if ($valid) {
                Auth::login($user, true);
                ActiveSession::addSession($user->id);
                $user->active = true;
                $user->save();

                return response()->json([
                    'result' => true,
                ]);
            } else {
                return response()->json(array("result" => false, "msg" => __("کد تایید نامعتبر است!")));
            }
        }
    }

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }
}
