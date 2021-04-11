<?php

namespace App\Models;

use App\Events\NotificationEvent;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Ixudra\Curl\Facades\Curl;

class Notification extends Model
{

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function sender()
    {
        return $this->belongsTo("App\Models\Page", "from");
    }

    public function notifiable()
    {
        return $this->morphTo("notifiable");
    }

    public function comment()
    {
        return $this->belongsTo("App\Models\Comment", "connected_to");
    }

    public function toArray()
    {
        $data = parent::toArray();
        if ($data['action'] == 'comment' || $data['action'] == 'reply') {
            $data['comment'] = $this->comment;
        }
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
                    $notifiable_type = Post::class;
                    $title = $thename . " " . "محتوای شما را پسندید";
                    $url = url("/posts/$notifiable_id");
                    break;
                case "follow":
                    $type = "page";
                    $notifiable_type = Page::class;
                    $title = $thename . " " . "شما را دنبال می‌کند";
                    $url = url("/$username");
                    break;
                case "comment":
                    $type = "post";
                    $notifiable_type = Post::class;
                    $title = $thename . " " . "برای محتوای شما نظر گذاشت";
                    $url = url("/posts/$notifiable_id");
                    break;
                case "like_comment":
                    $type = "comment";
                    $notifiable_type = Comment::class;
                    $title = $thename . " " . "دیدگاه شما پسندید";
                    $url = url("/posts/$notifiable_id");
                    break;
                case "reply":
                    $type = "comment";
                    $notifiable_type = Comment::class;
                    $title = $thename . " " . "به نظر شما پاسخ داد";
                    $url = url("/posts/$notifiable_id");
                    break;
                case "skill_credit":
                    $type = "skill";
                    $notifiable_type = Skill::class;
                    $skill = Skill::query()->find($notifiable_id);
                    if ($skill instanceof Skill) {
                        $title = $thename . " " . "مهارت $skill->name شما را تایید کرد.";
                    }
                    break;
                case "mention":
                    $type = "post";
                    $notifiable_type = Post::class;
                    $url = url("/posts/$notifiable_id");
                    $title = $thename . " " . "در یک محتوا از شما نام برده";
                    break;
            }
            if ($to != $from->id) {
                $notification = new Notification();
                $notification->from = $from->id;
                $notification->to = $to;

                $notification->action = $action;

                $notification->notifiable_id = $notifiable_id;
                $notification->notifiable_type = $notifiable_type;
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

    /**
     *
     * @param integer $notifiable_id
     * @param integer $to
     * @param string $text
     */
    public static function sendReportRespond($notifiable_id, $to, $text)
    {

        $notification = new Notification();
        $notification->from = -1;
        $notification->to = $to;

        $notification->action = "report_respond";

        $notification->notifiable_id = $notifiable_id;
        $notification->notifiable_type = Report::class;
        $notification->connected_to = $notifiable_id;
        $notification->text = $text;
        $notification->save();
        event(new NotificationEvent($notification));
        return $notification;
    }

}
