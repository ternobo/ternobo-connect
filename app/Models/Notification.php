<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use App\Events\NotificationEvent;
use Ixudra\Curl\Facades\Curl;

class Notification extends Model {

    public function skill() {
        return $this->belongsTo("App\Skill", "notifications_id");
    }

    public function mycomment() {
        return $this->belongsTo("App\Comment", "notifications_id");
    }

    public function page() {
        return $this->belongsTo("App\Page", "notifications_id");
    }

    public function user() {
        return $this->belongsTo("App\User", "user_id");
    }

    public function post() {
        return $this->belongsTo("App\Post", "notifications_id");
    }

    public function comment() {
        return $this->belongsTo("App\Comment", "connected_to");
    }

    /**
     * 
     * @param type $action
     * @param type $type
     * @param type $notifiable_id
     * @param type $page_id
     * @param type $connected_to
     */
    public static function sendNotification($action, $notifiable_id, $page_id, $connected_to) {
        $type = "";
        $user = Page::find($page_id)->user;
        if ($user instanceof User) {
            $thename = Auth::user()->name;
            $username = Auth::user()->username;
            switch ($action) {
                case "like":
                    $type = "post";
                    $title = $thename . " " . "محتوای شما را پسندید";
                    $url = url("/posts/$notifiable_id");
                    break;
                case "follow":
                    $type = "page";
                    $title = $thename . " " . "شما را دنبال می‌کند";
                    $url = url("/$username");
                    break;
                case "comment":
                    $type = "comment";
                    $title = $thename . " " . "برای محتوای شما نظر گذاشت";
                    $url = url("/posts/$notifiable_id");
                    break;
                case "reply":
                    $type = "comment";
                    $title = $thename . " " . "به نظر شما پاسخ داد";
                    $url = url("/posts/$notifiable_id");
                    break;
                case "skill_credit":
                    $type = "skill";
                    $skill = Skill::query()->find($notifiable_id);
                    if ($skill instanceof Skill) {
                        $title = $thename . " " . "مهارت $skill->name شما را تایید کرد.";
                    }
                    break;
                case "mention":
                    $type = "post";
                    $url = url("/posts/$notifiable_id");
                    $title = $thename . " " . "در یک محتوا از شما نام برده";
                    break;
            }
            if ("$page_id" !== Auth::user()->getPage()->id . "") {
                $notification = new Notification();
                $notification->user_id = Auth::user()->id;
                $notification->action = $action;
                $notification->notifications_id = $notifiable_id;
                $notification->notifications_type = $type;
                $notification->page_id = $page_id;
                $notification->connected_to = $connected_to;
                $notification->save();
                event(new NotificationEvent($notification));

                Curl::to("https://api.push-pole.com/v2/messaging/notifications/")
                        ->withHeader("authorization: Token " . env("PUSHE_TOKEN"))
                        ->withContentType('application/json')
                        ->withData(array(
                            'app_ids' => ['com.ternobo.connect'],
                            "filters" => array(
                                "pushe_id" => [$user->pushe_id]
                            ),
                            "data" => array(
                                "icon" => "https://ternobo.com/apple-touch-icon.png",
                                "notif_icon" => "apps",
                                "sound_url" => "https://ternobo.com/blank.mp3",
                                "show_app" => true,
                                "title" => "ترنوبو",
                                "content" => $title,
                                "wake_screen" => true,
                                "action" => array(
                                    "action_type" => "U",
                                    "action_data" => "https://ternobo.com/notifications"
                                )
                            ),
                            "time_to_live" => 604800
                        ))
                        ->asJson(true)
                        ->post();
            }
        }
    }

}
