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
        $notifications = Notification::query()->with("notifiable")->where("from", "-1")->latest()->paginate(10);
        return response()->json(['result' => true, "data" => $notifications]);
    }

    public function store(NotificationRequest $request)
    {
        if ($request->filled("report_id") && $request->report_id != 0) {
            $report = Report::find($request->report_id);
            $text = $request->text;
            $title = $request->title;
            $icon = $request->icon;

            $notification = Notification::sendReportRespond($report->id, $report->user_id, $title, $text, $icon);
            return response()->json(['result' => true, 'notification' => $notification]);
        } else {
            $text = $request->text;
            $title = $request->title;
            $icon = $request->icon;

            $to = $request->filled("to_all") && $request->to_all == true ? -1 : $request->to;

            $notification = Notification::sendTo($to, $title, $text, $icon);
            return response()->json(['result' => true, 'notification' => $notification]);
        }
    }

}
