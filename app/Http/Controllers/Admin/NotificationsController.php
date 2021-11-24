<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\NotificationRequest;
use App\Models\Notification;
use App\Models\Report;
use App\Services\Notification\NotificationService;

class NotificationsController extends Controller
{
    private NotificationService $service;

    public function __construct(NotificationService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $notifications = Notification::query()->with(["notifiable", "receiver.user" => function ($query) {
            $query->withTrashed();
        }])->where("from", "-1")->where(function ($query) {
            $query->whereHas("receiver.user")->whereHas("receiver")->orWhere("to", '-1');
        })->latest()->paginate(10);
        return response()->json(['result' => true, "data" => $notifications]);
    }

    public function store(NotificationRequest $request)
    {
        $this->service->sendNotification($request->title, $request->text, $request->icon, $request->to);
    }
}
