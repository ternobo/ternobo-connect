<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\VerificationRequest;
use App\Models\ActiveSession;
use App\Models\InviteLink;
use App\Models\Mail;
use App\Models\User;
use App\Models\Verification;
use App\Rules\PhoneNumber;
use App\Services\OtpService;
use App\SMS;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class VerificationController extends Controller
{

    private OtpService $service;

    public function __construct(OtpService $service)
    {
        $this->service = $service;
    }

    public function sendVerificationCode(VerificationRequest $request)
    {
        $signup = $request->input("signup", false);
        $user = User::query()->where("phone", $request->phone)->whereRelation("personalPage", "visible", "=", true)->exists();

        if ($signup && $user) {
            return $this->generateResponseErrors(false, null, [
                'phone' => [
                    __("validation.unique", ["attribute" => __("validation.attributes.phone")])
                ]
            ], 422);
        }

        return response()->json($this->service->sendOtp($request->phone));
    }

    public function verifyCode(Request $request)
    {
        $verificationResult = $this->service->validate($request->phone, $request->code);

        if ($verificationResult['result']) {
            $invite = InviteLink::query()->where("code", session("invite_code"))->first();
            $user = User::query()->where("phone", $request->phone)->where("visible", false)->first();
            if ($invite instanceof InviteLink && $user instanceof User) {
                DB::beginTransaction();
                try {
                    $page = $user->personalPage;
                    $page->visible = true;
                    $page->save();

                    $invite->valid = false;
                    $invite->used_by = $user->id;
                    $invite->save();

                    $user->created_at = now();
                    $user->save(['timestamps' => false]);

                    ActiveSession::addSession($user->id);
                    Auth::login($user, true);

                    $verificationResult['data']['login'] = true;
                    DB::commit();
                } catch (\Throwable $th) {
                    DB::rollBack();
                    throw $th;
                }
            } elseif ($user instanceof User) {
                return $this->generateResponseErrors(false, null, [
                    'phone' => [
                        __("validation.unique", ["attribute" => __("validation.attributes.phone")])
                    ]
                ], 422);
            }
        }

        return response()->json($verificationResult);
    }
}
