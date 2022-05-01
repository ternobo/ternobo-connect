<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\ContentSeen
 *
 * @property int $id
 * @property int $user_id
 * @property int $post_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|ContentSeen newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ContentSeen newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ContentSeen query()
 * @method static \Illuminate\Database\Eloquent\Builder|ContentSeen whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContentSeen whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContentSeen wherePostId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContentSeen whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContentSeen whereUserId($value)
 * @mixin \Eloquent
 */
class ContentSeen extends Model {
    //
}
