<?php

namespace App\Services\Notification;

use App\Models\Notification;
use App\Services\RestfulService;

class NotificationService extends RestfulService
{
    public function sendNotification($title, $text, $icon, $to, $action = "ternobo", $notifiable_id = null, $notifiable_type = null, $meta = null)
    {
        return Notification::create([
            "title" => $title,
            "text" => $text,
            "icon" => $icon,
            "notifiable_id" => $notifiable_id,
            "notifiable_type" => $notifiable_type,
            "action" => $action,
            "from" => "-1",
            "to" => $to
        ]);
    }
}
