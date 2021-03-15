<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Support\Facades\Auth;
use Ternobo\TernoboWire\TernoboWire;

class NotificationController extends Controller
{

    public function index()
    {
        Notification::query()
            ->where("seen", false)
            ->where("to", Auth::user()->personalPage->id)->update(['seen' => true]);
        $notifications = Auth::user()->getNotifications();
        // return response()->json($notifications);
        return TernoboWire::render("Notifications", array("notifications" => $notifications));
    }

}
