<?php

namespace App\Services;

use App\Models\Like;
use App\Models\MonitizationRequest;
use App\Models\Page;
use App\Models\Post;
use App\Models\User;

/**
 * Monitization conditions
 * 
 * - Share posts: 2
 * - Get likes by Signed up users: 6
 * - Enable two-step authentication
 * - Get likes by Visitor users: 250
 * 
 * 
 */
class MonitizationManagementService extends MonitizationService
{
    public function setRequestStatus($requestId, $status)
    {
        $request = MonitizationRequest::query()->findOrFail($requestId);
        $request->status = $status;
        $request->save();
        return $request;
    }

    public function getRequests()
    {
        return  MonitizationRequest::query()->latest()->paginate(20);
    }

    public function removeRequest($requestId)
    {
        return MonitizationRequest::query()->findOrFail($requestId)->delete();
    }
}
