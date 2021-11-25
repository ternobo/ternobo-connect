<?php

namespace App\Http\Controllers\Admin\Monitization;

use App\Http\Controllers\Controller;
use App\Models\MonitizationRequest;
use App\Services\MonitizationManagementService;

class MonitizationManagementController extends Controller
{

    private MonitizationManagementService $service;

    public function __construct(MonitizationManagementService $service)
    {
        $this->service = $service;
    }

    public function acceptMonitizationRequest(MonitizationRequest $request)
    {
        $this->service->acceptMonitizationRequest($request->request_id, $request->text);
    }

    public function rejectMonitizationRequest(MonitizationRequest $request)
    {
        $this->service->rejectMonitizationRequest($request->request_id, $request->text);
    }
}
