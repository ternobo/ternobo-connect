<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Models\Action;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Notification;

class NotificationController extends Controller {

    public function index() {
        $pages = array();
        $notifications_unread = Notification::query()
                        ->where("seen", false)
                        ->where("page_id", Auth::user()->getPage()->id)->get();
        $notifications = Notification::query()
                ->where("page_id", Auth::user()->getPage()->id)
                ->latest()
                ->whereHas("user", function ($query) {
                    $query->where("active", true);
                })
                ->paginate(10);
        foreach ($notifications_unread as $notification) {
            $notification->seen = true;
            $notification->save();
        }
        return view("notifications", array("notifications" => $notifications, "pages" => $pages));
    }

}
