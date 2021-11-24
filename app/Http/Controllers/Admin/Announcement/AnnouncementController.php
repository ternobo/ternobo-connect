<?php

namespace App\Http\Controllers\Admin\Announcement;

use App\Http\Controllers\Controller;
use App\Http\Requests\AnnouncementRequest;
use App\Services\Announcement\AnnouncementService;
use Illuminate\Http\Request;

class AnnouncementController extends Controller
{
    private AnnouncementService $service;


    public function __construct(AnnouncementService $service)
    {
        $this->service = $service;
    }

    public function sendAnnouncement(AnnouncementRequest $request)
    {
        return $this->generateResponse(
            true,
            $this->service->sendAnnouncement(
                $request->title,
                $request->text,
                $request->icon,
                $request->has_confetti,
                $request->user_id
            )
        );
    }
}
