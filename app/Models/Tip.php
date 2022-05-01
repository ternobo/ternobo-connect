<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Tip
 *
 * @property int $id
 * @property int $post_id
 * @property int|null $user_id
 * @property string|null $phone_number
 * @property int $guest
 * @property int $amount
 * @property array $meta
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $anonymous
 * @property-read \App\Models\Post $post
 * @property-read \App\Models\User|null $user
 * @method static \Database\Factories\TipFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Tip newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Tip newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Tip query()
 * @method static \Illuminate\Database\Eloquent\Builder|Tip whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tip whereAnonymous($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tip whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tip whereGuest($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tip whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tip whereMeta($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tip wherePhoneNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tip wherePostId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tip whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Tip whereUserId($value)
 * @mixin \Eloquent
 */
class Tip extends Model
{
    use HasFactory;

    protected $fillable = [
        'post_id',
        'amount',
        'user_id',
        'meta',
        'anonymous',
    ];

    protected $hidden = [
        'phone_number',
    ];

    protected $casts = ['meta' => 'array'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function post()
    {
        return $this->belongsTo(Post::class);
    }

}
