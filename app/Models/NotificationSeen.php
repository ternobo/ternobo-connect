<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

/**
 * App\Models\NotificationSeen
 *
 * @property int $id
 * @property int $user_id
 * @property int $notification_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|NotificationSeen newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|NotificationSeen newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|NotificationSeen query()
 * @method static \Illuminate\Database\Eloquent\Builder|NotificationSeen whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NotificationSeen whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NotificationSeen whereNotificationId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NotificationSeen whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NotificationSeen whereUserId($value)
 * @mixin \Eloquent
 */
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
