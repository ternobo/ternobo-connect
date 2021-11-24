<?php

namespace App\Services;

use App\Models\Like;
use App\Models\MonitizationRequest;
use App\Models\Page;
use App\Models\Post;
use App\Models\User;
use App\Services\Notification\NotificationService;

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
    private NotificationService $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

    public function acceptMonitizationRequest($requestId, $text = null)
    {
        $request = MonitizationRequest::query()->findOrFail($requestId);
        $request->status = "accepted";

        $this->notificationService->sendNotification("notification-titles.partnership.accepted", $text, "/badges/ternobopartner.svg", $request->user_id);

        $request->save();
        return $request;
    }

    public function rejectMonitizationRequest($requestId, $text = null)
    {
        $request = MonitizationRequest::query()->findOrFail($requestId);
        $request->status = "rejected";

        $this->notificationService->sendNotification("notification-titles.partnership.accepted", $text, "/images/logo.svg", $request->user_id);

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
