<?php

namespace App\Http\Controllers\Auth;

use App\Models\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Http\Request;
use App\Models\SMS;
use App\Models\Mail;
use App\Models\PasswordReset;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ForgotPasswordController extends Controller {
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

use SendsPasswordResetEmails;

    public function resetPassword(Request $request) {
        $validator = Validator::make($request->all(), [
                    "email" => "required",
        ]);
        if ($validator->fails()) {
            return false;
        } else {
            $user = User::query()->where("phone", $request->email)->orWhere("email", $request->email)->first();
            if ($user instanceof User) {
                $passwordrest = new PasswordReset();
                $passwordrest->email = $request->email;
                $passwordrest->token = random_int(111111, 999999);

                if ($this->checkEmail($request->email)) {
                    $user = User::query()->orWhere("email", $request->email)->first();
                    $html = view('emails.forgotpass', array("code" => $passwordrest->token, "username" => $user->username))->render();
                    $text = "بازیابی رمزعبور در ترنوبو";
                    $title = "بازیابی رمزعبور ترنوبو";
                    $mail = new Mail();
                    $mail->addAddress($request->email);
                    $mail->send($title, $text, $html);
                    $passwordrest->save();
                    return response()->json(array("result" => true, "phone" => false));
                } else {
                    $passwordrest->save();
                    $sms = new SMS($request->email);
                    $sms->sendUltraFastSMS(array(SMS::makeParameter("passreset", $passwordrest->token)), "24525");
                    session()->put("email", $request->email); 
                    return response()->json(array("result" => true, "phone" => true));
                }
            } else {
                return response()->json(array("result" => false, "errors" => array("هیچ کاربری با این ایمیل یا شماره موبایل یافت نشد!")));
            }
        }
    }

    public static function quickRandom($length = 16) {
        $pool = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

        return substr(str_shuffle(str_repeat($pool, 5)), 0, $length);
    }

    public function updatePassword(Request $request) {
        $messages = [
            "exists" => "کد بازیابی رمزعبور اشتباه است."
        ];
        $validator = Validator::make($request->all(), [
                    "newpassword" => "required",
                    "code" => "required|exists:password_resets,token"
                        ], $messages);
        if ($validator->fails()) {
            abort(404);
        } else {
            $passreset = PasswordReset::where("token", $request->code)->firstOrFail();
            $user = User::query()->where("phone", $passreset->email)->orWhere("email", $passreset->email)->first();
            if ($user instanceof User) {
                $user->password = Hash::make($request->newpassword);
                $user->save();
                Auth::login($user, true);
                DB::raw("delete from `password_resets` where `email` is $passreset->email");
                return response()->json(array("result" => true));
            } else {
                return response()->json(array("result" => false, "errors" => array("کد بازیابی رمزعبور اشتباه است.")));
            }
        }
    }

    public function changePassword($token) {
        $passreset = PasswordReset::where("token", $token)->firstOrFail();
        return view("auth.passwords.reset", array("token" => $token));
    }

    private function checkEmail($email) {
        $find1 = strpos($email, '@');
        $find2 = strpos($email, '.');
        return ($find1 !== false && $find2 !== false && $find2 > $find1);
    }

}
