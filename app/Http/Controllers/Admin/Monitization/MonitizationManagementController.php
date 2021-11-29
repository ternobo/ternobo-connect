<?php

namespace App\Http\Controllers\Admin\Monetization;

use App\Http\Controllers\Controller;
use App\Models\MonetizationRequest;
use App\Services\MonetizationManagementService;

class MonetizationManagementController extends Controller
{

    private MonetizationManagementService $service;

    public function __construct(MonetizationManagementService $service)
    {
        $this->service = $service;
    }

    public function acceptMonetizationRequest(MonetizationRequest $request)
    {
        $this->service->acceptMonetizationRequest($request->request_id, $request->text);
    }

    public function rejectMonetizationRequest(MonetizationRequest $request)
    {
        $this->service->rejectMonetizationRequest($request->request_id, $request->text);
    }
}
