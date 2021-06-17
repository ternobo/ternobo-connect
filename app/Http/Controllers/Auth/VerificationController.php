<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Mail;
use App\Models\Verification;
use App\Rules\PhoneNumber;
use App\SMS;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class VerificationController extends Controller
{
    public function sendVcode(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'phone' => ['unique:users,phone', new PhoneNumber()],
            'email' => 'email:rfc|unique:users,email',
        ]);
        if ($validator->fails()) {
            return response()->json(array("result" => false, "errors" => $validator->errors()));
        }
        session()->remove("phone");
        session()->remove("email");

        if ($request->has("phone")) {
            $sms = new SMS($request->phone);
            $code = random_int(111111, 999999);
            $verification = new Verification();
            $verification->code = $code;
            $verification->phone = $request->phone;
            $verification->save();
            session()->put("phone", $request->phone);
            return response()->json(array("result" => $sms->sendUltraFastSMS(array(SMS::makeParameter("VerificationCode", $code)), "23109")));
        } elseif ($request->has("email")) {
            $code = random_int(111111, 999999);
            $verification = new Verification();
            $verification->code = $code;
            $verification->email = $request->email;
            $verification->save();
            session()->put("email", $request->email);
            $html = preg_replace("/\r|\n/", "", view('emails.verification', array("vcode" => $code))->render());
            $text = "کد فعالسازی شما در ترنوبو : $code";
            $title = "کد فعالسازی ترنوبو";
            $mail = new Mail();
            $mail->addAddress($request->email);
            $mail->send($title, $text, $html);
            session()->put("email", $request->email);
            return response()->json(array("result" => true));
        } else {
            return response()->json(array("result" => false, "msg" => __("شماره همراه یا ایمیل اجباری است.")));
        }
    }

    public function verifyCode(Request $request)
    {
        if ($request->has("code")) {
            $phone = "";
            $verification = null;
            if (session()->has("phone")) {
                $phone = session()->get("phone");
                $verification = Verification::query()->where("code", $request->code)->where("phone", $phone)->first();
            } elseif (session()->has("email")) {
                $email = session()->get("email");
                $verification = Verification::query()->where("code", $request->code)->where("email", $email)->first();
            }
            if ($verification instanceof Verification) {
                $verification->delete();
                return response()->json(array("result" => true));
            } else {
                return response()->json(array("result" => false, "msg" => __("کد فعال سازی نامعتبر است!")));
            }
        }
        return abort(400);
    }
}
