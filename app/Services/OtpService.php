<?php

namespace App\Services;

use Ixudra\Curl\Facades\Curl;
use Ipecompany\Smsirlaravel\Smsirlaravel;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Request;
use GuzzleHttp\Exception\BadResponseException;
use Carbon\Carbon;
use App\Utils\StringUtils;
use App\Services\RestfulService;
use App\Models\User;
use App\Models\Otp;

class OtpService extends RestfulService
{
    private static $GLOBALBASE = "https://api.tyntec.com";

    private function resendInternationalOtp($otp_id, $application_id)
    {
        return Curl::to(static::$GLOBALBASE . "/2fa/v1/otp/$otp_id?applicationId=$application_id")->withHeaders([
            'apikey' => env("SMS_API_TOKEN"),
        ])->asJson()
            ->post();
    }


    public function sendInternationalOtp($identifier)
    {
        $respose = [];
        $application_id = env("SMS_APPLICATION_ID");

        $otp = Otp::query()->where('identifier', $identifier)->where('token', null)->where("valid", true)->first();

        if ($otp != null) {
            $otp_id = $otp->verification_token;
            $respose = $this->resendInternationalOtp($otp_id, $application_id);
            if (isset($respose->otpStatus) && $respose->otpStatus == "EXPIRED") {
                $otp->delete();
                return $this->sendInternationalOtp($identifier);
            }
        } else {
            $respose = Curl::to(static::$GLOBALBASE . "/2fa/v1/otp?number=$this->phone&applicationId=$application_id")->withHeaders([
                'apikey' => env("SMS_API_TOKEN"),
            ])->asJson()
                ->post();
        }

        if (isset($respose->otpId)) {
            Otp::query()->create([
                'identifier' => $identifier,
                'token' => null,
                'verification_token' => $respose->otpId,
                'validity' => 2
            ]);
            return $this->generateResponse(true, null, __("messages.sms.sms_sended"));
        }
        return $this->generateResponse(false, null, ['phone' => [$respose->message]]);
    }

    public function sendGenerateAndSendOtp(string $phone, int $length = 6)
    {
        $otp = $this->generate($phone, $length, 2);
        $isSMSEnabled = env("SMS_ENABALED", true);
        $smsSended = false;
        if ($isSMSEnabled) {
            try {

                $smsSendResult = Smsirlaravel::ultraFastSend([
                    "VerificationCode" => $otp->token,
                ], env("SMS_TEMPLATE_ID"), Str::replace("+98", "0", $phone));
            } catch (BadResponseException $ex) {
                $body = json_decode($ex->getResponse()->getBody()->getContents());
                if ($body->Message == 'BadRequest') {
                    return response()->json($this->generateResponse(false, null, ["phone" => [__("validation.exists", ['attribute' => __("validation.attributes.phone")])]]), 422);
                } else {
                    return response()->json($this->generateResponse(false, null, null), 503);
                }
            }

            if ($smsSendResult['IsSuccessful']) {
                $smsSended = true;
            } else {
                return $this->generateResponse(true, null, $smsSendResult['Message'] . " - " . __("messages.sms.sms_saved"));
            }
        }
        return $this->generateResponse(true, null, $smsSended ? __("messages.sms.sms_sended") : __("messages.sms.sms_saved"));
    }

    public function sendOtp(string $phone)
    {
        if (Str::startsWith($phone, '+98')) {
            return $this->sendGenerateAndSendOtp($phone);
        } else {
            return $this->sendInternationalOtp($phone);
        }
    }

    /**
     * Generate and save OTP
     * @param string $identifier
     * @param int $digits
     * @param int $validity
     * @return mixed
     */
    protected function generate(string $identifier, int $digits = 4, int $validity = 2): Otp
    {
        Otp::query()->where('identifier', $identifier)->where('valid', true)->delete();

        $token = str_pad($this->generatePin(), 4, '0', STR_PAD_LEFT);

        if ($digits == 5)
            $token = str_pad($this->generatePin(5), 5, '0', STR_PAD_LEFT);

        if ($digits == 6)
            $token = str_pad($this->generatePin(6), 6, '0', STR_PAD_LEFT);


        return Otp::query()->create([
            'identifier' => $identifier,
            'token' => $token,
            'verification_token' => Str::uuid(),
            'validity' => $validity
        ]);
    }

    /**
     * @param string $identifier
     * @param string $token
     * @return mixed
     */
    public function validate(string $identifier, string $token): array
    {
        if (Str::startsWith($identifier, '+98')) {
            $otp = Otp::query()->where('identifier', $identifier)->where('token', $token)->first();

            if ($otp == null) {
                return $this->generateResponse(false, null, __("messages.invalid-otp"));
            } else {
                if ($otp->valid == true) {
                    $carbon = new Carbon();
                    $now = $carbon->now();
                    $validity = $otp->created_at->addMinutes($otp->validity);

                    if (strtotime($validity) < strtotime($now)) {
                        $otp->valid = false;
                        $otp->save();
                        return $this->generateResponse(false, null, __("messages.expired-otp"));
                    } else {
                        $otp->valid = false;
                        $otp->is_verified = true;
                        $otp->save();
                        return $this->generateResponse(true, ["token" => $otp->verification_token], __("messages.success-otp"));
                    }
                } else {
                    return $this->generateResponse(false, null, __("messages.invalid-otp"));
                }
            }
        } else {
            return $this->verifyInternationalOtp($identifier, $token);
        }
    }

    private function verifyInternationalOtp($identifier, $token)
    {
        $otp = Otp::query()->where('identifier', $identifier)->where('token', null)->where("valid", true)->first();

        if ($otp == null) {
            return $this->generateResponse(false, null, __("messages.invalid-otp"));
        }

        $otp_id = $otp->verification_token;

        $respose = Curl::to(static::$GLOBALBASE . "/2fa/v1/otp/$otp_id/check?otpCode=$token")->withHeaders([
            'apikey' => env("SMS_API_TOKEN"),
        ])->asJson()
            ->post();

        $return = $this->generateResponse(false, null, __("messages.invalid-otp"));

        switch ($respose->otpStatus) {
            case "VERIFIED":
                $return['result'] = true;
                $return['message'] = "";
                $return['data'] = ["token" => $otp->verification_token];
                $otp->valid = false;
                $otp->is_verified = true;
                $otp->save();

                break;
            case "EXPIRED":
                $return['message'] = __("otp.expired");
                break;
            case "TOO_MANY_ATTEMPTS":
                $return['message'] = __("otp.too_many_attempts");
                break;
        }

        return $return;
    }

    /**
     * @param int $digits
     * @return string
     */
    private function generatePin($digits = 4)
    {
        $i = 0;
        $pin = "";

        while ($i < $digits) {
            $pin .= mt_rand(0, 9);
            $i++;
        }

        return $pin;
    }
}
