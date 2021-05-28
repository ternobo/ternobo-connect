<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Ternobo\TernoboWire\TernoboWire;

class NotificationController extends Controller
{

    public function index()
    {
        $notifications = Auth::user()->getNotifications();
        return TernoboWire::render("Notifications", array("notifications" => $notifications));
    }

}
