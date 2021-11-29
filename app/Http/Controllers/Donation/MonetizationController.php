<?php

namespace App\Http\Controllers\Donation;

use App\Http\Controllers\Controller;
use App\Services\MonetizationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MonetizationController extends Controller
{

    private MonetizationService $service;

    public function __construct(MonetizationService $service)
    {
        $this->service = $service;
    }

    public function getMonetizationStatus()
    {
        return $this->generateResponse(true, $this->service->getMonetizationStatus(Auth::user()));
    }

    public function sendMonetizationRequest()
    {
        $request = $this->service->sendMonetizationRequest(Auth::user());
        return $this->generateResponse($request != null, $request);
    }
}
