<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Support\Facades\Auth;
use Ternobo\TernoboWire\TernoboWire;

class NotificationController extends Controller
{

    public function index()
    {
        $pages = array();
        $notifications_unread = Notification::query()
            ->where("seen", false)
            ->where("to", Auth::user()->personalPage->id)->get();
        $notifications = Notification::query()
            ->where("to", Auth::user()->personalPage->id)
            ->latest()
            ->whereHas("sender", function ($query) {
                $query->whereHas("user", function ($query) {
                    $query->where("active", true);
                });
            })
            ->paginate(15);
        // dd($notifications->toSql());
        foreach ($notifications_unread as $notification) {
            $notification->seen = true;
            $notification->save();
        }
        return TernoboWire::render("Notifications", array("notifications" => $notifications, "pages" => $pages));
    }

}
