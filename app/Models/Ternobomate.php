<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Ternobomate
 *
 * @property int $id
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|Ternobomate newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Ternobomate newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Ternobomate query()
 * @method static \Illuminate\Database\Eloquent\Builder|Ternobomate whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Ternobomate whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Ternobomate whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Ternobomate whereUserId($value)
 * @mixin \Eloquent
 */
class Ternobomate extends Model
{
    use HasFactory;

    protected $fillable = [
        "user_id"
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
