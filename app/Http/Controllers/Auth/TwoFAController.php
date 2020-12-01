<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Mail;
use App\Models\Verification;
use App\SMS;
use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\Image\ImagickImageBackEnd;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Writer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use PragmaRX\Google2FA\Google2FA;
use PragmaRX\Recovery\Recovery;

class TwoFAController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function get2FAInfo()
    {
        $user = Auth::user();
        return response()->json([
            'enabled' => $user->two_factor,
            'type' => $user->two_factor_type,
            'recovery_codes' => $user->two_factor_recovery_codes,
        ]);
    }

    public function deactive()
    {
        $user = Auth::user();
        $user->two_factor = false;
        $user->save();
        return response()->json(['result' => true]);
    }

    public function resetRecovery()
    {
        $user = Auth::user();

        $recovery = new Recovery();
        $recovery->numeric();
        $recovery->setBlocks(1);

        $recovery->setChars(8);
        $user->two_factor_recovery_codes = $recovery->toJson();
        $user->save();
        return response()->json([
            'codes' => $user->two_factor_recovery_codes,
        ]);
    }

    public function setup(Request $request)
    {
        if ($request->type === 'email') {
            return $this->setupEmail();
        } elseif ($request->type == 'phone') {
            return $this->setupSMS();
        } elseif ($request->type == "app") {
            $user = Auth::user();

            $google2fa = new Google2FA();

            $user->two_factor_type = "app";
            $user->two_factor_secret = $google2fa->generateSecretKey();
            $user->save();

            $qrCodeUrl = $google2fa->getQRCodeUrl(
                "Ternobo",
                Auth::user()->username,
                $user->two_factor_secret
            );

            $writer = new Writer(
                new ImageRenderer(
                    new RendererStyle(400),
                    new ImagickImageBackEnd()
                ));

            $qrcode_image = base64_encode($writer->writeString($qrCodeUrl));
            return response()->json([
                'qr_code' => 'data:image/png;base64,' . $qrcode_image,
            ]);
        }
        return abort(400);
    }

    public function setupSMS()
    {
        $user = Auth::user();
        $user->two_factor_type = "phone";
        $user->save();

        $code = random_int(111111, 999999);

        $verification = new Verification();
        $verification->code = $code;
        $verification->phone = $user->phone;
        $verification->save();

        $sms = new SMS($user->phone);
        $sms->sendUltraFastSMS([SMS::makeParameter("code", $code)], "36529");
        return response()->json(['result' => true]);
    }

    public function setupEmail()
    {
        $user = Auth::user();

        $user->two_factor_type = "email";
        $user->save();

        $code = random_int(111111, 999999);

        $verification = new Verification();
        $verification->code = $code;
        $verification->email = $user->email;
        $verification->save();
        session()->put("email", $user->email);
        $html = preg_replace("/\r|\n/", "", view('emails.twoFactor', array("vcode" => $code))->render());
        $text = "کد تایید هویت شما در ترنوبو : $code";
        $title = "کد تایید ترنوبو";
        $mail = new Mail();
        $mail->addAddress($user->email);
        $mail->send($title, $text, $html);
        session()->put("email", $user->email);
        return response()->json(array("result" => true));
    }

    public function enableTwoFA(Request $request)
    {
        $user = Auth::user();

        if ($request->type === 'email' || $request->type == "phone") {
            $verification = $request->type == "phone" ?
            Verification::query()->where("code", $request->code)->where("phone", $user->phone)->first()
            : Verification::query()->where("code", $request->code)->where("email", $user->email)->first();
            if ($verification instanceof Verification) {
                $verification->delete();
                $user->two_factor = true;

                $recovery = new Recovery();
                $recovery->numeric();
                $recovery->setBlocks(1);

                $recovery->setChars(8);
                $user->two_factor_recovery_codes = $recovery->toJson();

                $user->save();

                return response()->json(array("result" => true, 'recovery' => $user->two_factor_recovery_codes));
            } else {
                return response()->json(array("result" => false, "msg" => __("کد تایید نامعتبر است!")));
            }
        } elseif ($request->type === 'app') {
            $google2fa = new Google2FA();

            $valid = $google2fa->verifyKey($user->two_factor_secret, $request->code);
            if ($valid) {

                $recovery = new Recovery();
                $recovery->numeric();
                $recovery->setBlocks(1);

                $recovery->setChars(8);
                $user->two_factor = true;
                $user->two_factor_type = "app";
                $user->two_factor_recovery_codes = $recovery->toJson();
                $user->save();

                return response()->json([
                    'result' => true,
                    'recovery' => $user->two_factor_recovery_codes,
                ]);
            } else {
                return response()->json(array("result" => false, "msg" => __("کد تایید نامعتبر است!")));
            }
        }

        return abort(400);
    }

    public function generateSecret()
    {
        $google2fa = new Google2FA();

        $user = Auth::user();

        if ($user->two_factor_secret == null) {
            $user->two_factor_secret = $google2fa->generateSecretKey();
            $recovery = new Recovery();
            $recovery->numeric();
            $recovery->setBlocks(1);

            $recovery->setChars(8);

            $user->two_factor_recovery_codes = $recovery->toJson();
            $user->save();
        }

        $qrCodeUrl = $google2fa->getQRCodeUrl(
            "Ternobo",
            Auth::user()->username,
            $user->two_factor_secret
        );

        $writer = new Writer(
            new ImageRenderer(
                new RendererStyle(400),
                new ImagickImageBackEnd()
            ));

        $qrcode_image = base64_encode($writer->writeString($qrCodeUrl));
        return response()->json([
            'recovery' => $user->two_factor_recovery_codes,
            'data' => $qrcode_image,
        ]);
    }
}
