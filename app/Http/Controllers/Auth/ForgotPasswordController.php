<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\ActiveSession;
use App\Models\PasswordReset;
use App\Models\User;
use App\SMS;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ForgotPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset emails and
    | includes a trait which assists in sending these notifications from
    | your application to your users. Feel free to explore this trait.
    |
     */

    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "input" => "required",
        ]);
        if ($validator->fails()) {
            return false;
        } else {
            $user = User::query()
                ->where("phone", $request->input)
                ->orWhere("email", $request->input)
                ->orWhere("username", $request->input)
                ->first();
            if ($user instanceof User) {

                $passwordrest = new PasswordReset();
                $passwordrest->email = $user->phone;
                $passwordrest->token = random_int(111111, 999999);
                $passwordrest->save();

                $sms = new SMS($user->phone);
                $sms->sendUltraFastSMS(array(SMS::makeParameter("passreset", $passwordrest->token)), "24525");
                session()->put("email", $user->phone);
                return response()->json(array("result" => true, "msg" => __("messages.reset-sms-success-message")));

            } else {
                return response()->json(array("result" => false, "errors" => array('msg' => [__("messages.user-not-found")])));
            }
        }
    }

    public function checkCode(Request $request)
    {
        return response()->json([
            'result' => !Validator::make($request->all(), [
                "code" => "required|exists:password_resets,token",
            ], [
                "exists" => __("validation.password_code"),
            ])->fails(),
        ]);
    }

    public function updatePassword(Request $request)
    {
        $messages = [
            "exists" => __("validation.password_code"),
        ];
        $validator = Validator::make($request->all(), [
            "newpassword" => "required|min:8",
            "code" => "required|exists:password_resets,token",
        ], $messages);
        if ($validator->fails()) {
            return response()->json(array("result" => false, "errors" => $validator->errors()));
        } else {
            $passreset = PasswordReset::where("token", $request->code)->firstOrFail();
            $user = User::query()->where("phone", $passreset->email)->orWhere("email", $passreset->email)->first();
            if ($user instanceof User) {
                $user->password = Hash::make($request->newpassword);
                $user->save();
                ActiveSession::addSession($user->id);
                Auth::login($user, true);
                DB::raw("delete from `password_resets` where `email` is ?", $passreset->email);
                return response()->json(array("result" => true));
            } else {
                return response()->json(array("result" => false, "errors" => ["error" => "کاربر مربوطه مسدود شده است."]));
            }
        }
    }

    public function changePassword($token)
    {
        $passreset = PasswordReset::where("token", $token)->firstOrFail();
        return view("auth.passwords.reset", array("token" => $token));
    }

    private function checkEmail($email)
    {
        $find1 = strpos($email, '@');
        $find2 = strpos($email, '.');
        return ($find1 !== false && $find2 !== false && $find2 > $find1);
    }

}
