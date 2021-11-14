<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\VerificationRequest;
use App\Models\Mail;
use App\Models\Verification;
use App\Rules\PhoneNumber;
use App\Services\OtpService;
use App\SMS;
use Illuminate\Http\Request;
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
        return response()->json($this->service->sendOtp($request->phone));
    }

    public function verifyCode(Request $request)
    {
        return response()->json($this->service->validate($request->phone, $request->code));
    }
}
