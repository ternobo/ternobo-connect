<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\AdminNotifications
 *
 * @property int $id
 * @property string $title
 * @property int $user_id
 * @property string $text
 * @property int $readed
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|AdminNotifications newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AdminNotifications newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AdminNotifications query()
 * @method static \Illuminate\Database\Eloquent\Builder|AdminNotifications whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AdminNotifications whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AdminNotifications whereReaded($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AdminNotifications whereText($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AdminNotifications whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AdminNotifications whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AdminNotifications whereUserId($value)
 * @mixin \Eloquent
 */
class AdminNotifications extends Model
{

}
