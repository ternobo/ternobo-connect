<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Notification;
use App\Models\Page;
use App\Models\Post;
use App\Models\Skill;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Ternobo\TernoboWire\TernoboWire;

class NotificationController extends Controller
{

    public function index()
    {
        $notifications = Auth::user()->getNotifications();
        return TernoboWire::render("Notifications", array("notifications" => $notifications));
    }

    public function get()
    {
        $notifications = Notification::query()
            ->whereHas("sender")
            ->where(function ($query) {
                $query->where("to", auth()->user()->personalPage->id)
                    ->orWhere("to", "-1");
            })
            ->where("created_at", ">=", Carbon::now()->subMonth())
            ->whereHasMorph("notifiable", [Post::class, Skill::class, Comment::class, Page::class])
            ->orderByDesc("pin")
            ->latest()
            ->with(["sender", "notifiable"])
            ->limit(5)
            ->get();
        return $this->generateResponse(true, ["notifications" => $notifications]);
    }
}
