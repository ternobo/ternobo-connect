<?php

namespace App\Http\Controllers\Donation;

use App\Http\Controllers\Controller;
use App\Services\MonitizationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MonitizationController extends Controller
{

    private MonitizationService $service;

    public function __construct(MonitizationService $service)
    {
        $this->service = $service;
    }

    public function getMonitizationStatus()
    {
        return $this->generateResponse(true, $this->service->getMonitizationStatus(Auth::user()));
    }

    public function sendMonitizationRequest()
    {
        $request = $this->service->sendMonitizationRequest(Auth::user());
        return $this->generateResponse($request != null, $request);
    }
}
