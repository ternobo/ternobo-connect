<?php

namespace App\Models;

use App\Events\NotificationEvent;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Ixudra\Curl\Facades\Curl;

class Notification extends Model
{

    public function skill()
    {
        return $this->belongsTo("App\Models\Skill", "notificationable_id");
    }

    public function mycomment()
    {
        return $this->belongsTo("App\Models\Comment", "notificationable_id");
    }

    public function page()
    {
        return $this->belongsTo("App\Models\Page", "notificationable_id");
    }

    public function sender()
    {
        return $this->belongsTo("App\Models\Page", "from");
    }

    public function post()
    {
        return $this->belongsTo("App\Models\Post", "notificationable_id");
    }

    public function comment()
    {
        return $this->belongsTo("App\Models\Comment", "connected_to");
    }

    public function toArray()
    {
        // get the original array to be displayed
        $data = parent::toArray();

        switch ($data['notificationable_type']) {
            case "post":
                $data['post'] = $this->post;
                break;
            case "page":
                $data['page'] = $this->page;
                break;
            case "comment":
                $data['comment'] = $this->comment;
                $data['mycomment'] = $this->mycomment;
                break;
            case "skill":
                $data['skill'] = $this->skill;
                break;
        }

        if ($data['action'] == 'comment') {
            $data['comment'] = $this->comment;
        }

        $data['sender'] = $this->sender;

        return $data;
    }

    /**
     *
     * @param type $action
     * @param type $type
     * @param type $notifiable_id
     * @param type $to
     * @param type $connected_to
     */
    public static function sendNotification($action, $notifiable_id, $to, $connected_to, $from = null)
    {
        if ($from === null) {
            $from = Auth::user()->personalPage;
        }
        $type = "";
        $user = Page::find($to)->user;
        if ($user instanceof User) {
            $thename = $from->name;
            $username = $from->username;
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
                    $type = "post";
                    $title = $thename . " " . "برای محتوای شما نظر گذاشت";
                    $url = url("/posts/$notifiable_id");
                    break;
                case "like_comment":
                    $type = "comment";
                    $title = $thename . " " . "دیدگاه شما پسندید";
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
            if ($to != $from->id) {
                $notification = new Notification();
                $notification->from = $from->id;
                $notification->to = $to;

                $notification->action = $action;

                $notification->notificationable_id = $notifiable_id;
                $notification->notificationable_type = $type;
                $notification->connected_to = $connected_to;

                $notification->save();

                event(new NotificationEvent($notification));

                if ($user->pushe_id !== null) {
                    Curl::to("https://api.push-pole.com/v2/messaging/notifications/")
                        ->withHeader("authorization: Token " . env("PUSHE_TOKEN"))
                        ->withContentType('application/json')
                        ->withData(array(
                            'app_ids' => ['com.ternobo.connect'],
                            "filters" => array(
                                "pushe_id" => [$user->pushe_id],
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
                                    "action_data" => "https://ternobo.com/notifications",
                                ),
                            ),
                            "time_to_live" => 604800,
                        ))
                        ->asJson(true)
                        ->post();
                }
            }
        }
    }

}
