<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\NotificationRequest;
use App\Models\Notification;
use App\Models\Report;

class NotificationsController extends Controller
{
    public function index()
    {
        $notifications = Notification::query()->with("notifiable")->latest()->paginate(10);
        return response()->json(['result' => true, "data" => $notifications]);
    }

    public function store(NotificationRequest $request)
    {
        $report = Report::find($request->report_id);
        $text = $request->text;

        $notification = Notification::sendReportRespond($report->id, $report->user_id, $text);
        return response()->json(['result' => true, 'notification' => $notification]);
    }
}
