<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class NotificationSeen extends Model
{
    use HasFactory;

    public static function seenNotification($notification_id)
    {
        $user = Auth::user();
        $seen = new NotificationSeen();
        $seen->notification_id = $notification_id;
        $seen->user_id = $user->id;
        $seen->save();
        return $seen;
    }
}
