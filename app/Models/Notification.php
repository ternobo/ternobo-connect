<?php

namespace App\Models;

use App\Events\NotificationEvent;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

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

    public function receiver()
    {
        return $this->belongsTo("App\Models\Page", "to");
    }

    public function notifiable()
    {
        return $this->morphTo("notifiable");
    }

    public function comment()
    {
        return $this->belongsTo("App\Models\Comment", "connected_to");
    }

    public function seenNotification()
    {
        return $this->hasMany(NotificationSeen::class);
    }

    public function seen()
    {
        $seen = NotificationSeen::query()->where("user_id", Auth::user()->id)->where("notification_id", $this->id)->exists();
        if (!$seen) {
            $this->pin = false;
            $this->save();
            return NotificationSeen::seenNotification($this->id);
        }
        return false;
    }

    public function toArray()
    {
        $data = parent::toArray();
        if ($data['action'] == 'comment' || $data['action'] == 'reply') {
            $data['comment'] = $this->comment;
        }

        $data["notifiable"] = $this->notifiable_type == Post::class ? $this->notifiable->loadRelations() : $this->notifiable;


        return $data;
    }

    /**
     * Send Nofication 
     * 
     * @param string $action
     * @param int $type
     * @param int $notifiable_id
     * @param int $to
     * @param int $connected_to - for example comment_id is connected to Post notification.
     */
    public static function sendNotification($action, $notifiable_id, $to, $connected_to, $from = null, $guest = false, $meta = [])
    {
        $from_id = null;
        if ($from === null && !$guest) {
            $from = Auth::user()->personalPage;
            $from_id = $from->id;
        }
        $type = "";
        $user = Page::find($to)->user;
        if ($user instanceof User) {
            switch ($action) {
                case "like":
                    $notifiable_type = Post::class;
                    $url = url("/posts/$notifiable_id");
                    break;
                case "follow":
                    $notifiable_type = Page::class;
                    $username = Page::find($notifiable_id);
                    $url = url("/$username");
                    break;
                case "comment":
                    $notifiable_type = Post::class;
                    $url = url("/posts/$notifiable_id");
                    break;
                case "like_comment":
                    $notifiable_type = Comment::class;
                    $url = url("/posts/$notifiable_id");
                    break;
                case "reply":
                    $notifiable_type = Comment::class;
                    $url = url("/posts/$notifiable_id");
                    break;
                case "skill_credit":
                    $notifiable_type = Skill::class;
                    break;
                case "mention":
                    $notifiable_type = Post::class;
                    $url = url("/posts/$notifiable_id");
                    break;
                case "mention_comment":
                    $notifiable_type = Comment::class;
                    $url = url("/posts/$connected_to?comment=$notifiable_id");
                    break;
                case "donation":
                    $notifiable_type = Post::class;
                    $url = url("/posts/$notifiable_id");
                    break;
            }
            if ($to != $from_id || $guest) {
                $notification = new Notification();
                $notification->from = $from_id;
                $notification->to = $to;

                $notification->action = $action;
                $notification->guest = $guest;

                $notification->notifiable_id = $notifiable_id;
                $notification->notifiable_type = $notifiable_type;
                $notification->connected_to = $connected_to;
                $notification->save();

                broadcast(new NotificationEvent($notification))->toOthers();
            }
        }
    }

    /**
     *
     * @param integer $notifiable_id
     * @param integer $to
     * @param string $text
     */
    public static function sendReportRespond($notifiable_id, $to, $title, $text, $icon)
    {
        $notification = new Notification();
        $notification->from = -1;
        $notification->to = $to;
        $notification->title = $title;
        $notification->icon = $icon;

        $notification->action = "report_respond";

        $notification->notifiable_id = $notifiable_id;
        $notification->notifiable_type = Report::class;
        $notification->connected_to = $notifiable_id;
        $notification->text = $text;
        $notification->save();
        broadcast(new NotificationEvent($notification))->toOthers();
        return $notification;
    }

    /**
     *
     */
    public static function sendTo($to, $title, $text, $icon)
    {
        $notification = new Notification();
        $notification->from = -1;
        $notification->to = $to;
        $notification->title = $title;
        $notification->icon = $icon;

        $notification->action = "admin";

        $notification->text = $text;
        $notification->save();
        broadcast(new NotificationEvent($notification))->toOthers();
        return $notification;
    }
}
