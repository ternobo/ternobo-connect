<?php

namespace App\Services\Admin;

use App\Models\Like;
use App\Models\MonetizationRequest;
use App\Models\Page;
use App\Models\Post;
use App\Models\User;
use App\Services\Notification\NotificationService;

/**
 * Monetization conditions
 * 
 * - Share posts: 2
 * - Get likes by Signed up users: 6
 * - Enable two-step authentication
 * - Get likes by Visitor users: 250
 * 
 * 
 */
class MonetizationManagementService extends MonetizationService
{
    private NotificationService $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

    public function acceptMonetizationRequest($requestId, $text = null)
    {
        $request = MonetizationRequest::query()->findOrFail($requestId);
        $request->status = "accepted";

        $this->notificationService->sendNotification("notification-titles.partnership.accepted", $text, "/badges/ternobopartner.svg", $request->user_id);

        $request->save();
        return $request;
    }

    public function rejectMonetizationRequest($requestId, $text = null)
    {
        $request = MonetizationRequest::query()->findOrFail($requestId);
        $request->status = "rejected";

        $this->notificationService->sendNotification("notification-titles.partnership.accepted", $text, "/images/logo.svg", $request->user_id);

        $request->save();
        return $request;
    }

    public function getRequests()
    {
        return  MonetizationRequest::query()->latest()->paginate(20);
    }

    public function removeRequest($requestId)
    {
        return MonetizationRequest::query()->findOrFail($requestId)->delete();
    }
}
