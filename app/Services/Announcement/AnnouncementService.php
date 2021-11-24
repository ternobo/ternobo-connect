<?php

namespace App\Services\Announcement;

use App\Events\AnnouncementEvent;
use App\Models\Announcement;

class AnnouncementService
{
    public function sendAnnouncement($title, $text, $icon, $has_confetti = false, $user_id = null)
    {
        $announcement = Announcement::create([
            "title" => $title,
            "text" => $text,
            "icon" => $icon,
            "user_id" => $user_id,
            "has_confetti" => $has_confetti
        ]);
        broadcast(new AnnouncementEvent($announcement))->toOthers();
    }
}
