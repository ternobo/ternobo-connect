<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\SocialDriver
 *
 * @property int $id
 * @property string $driver
 * @property string $icon
 * @property string $name
 * @property int $active
 * @property string|null $link
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\ConnectedAccount|null $account
 * @method static \Illuminate\Database\Eloquent\Builder|SocialDriver newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SocialDriver newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SocialDriver query()
 * @method static \Illuminate\Database\Eloquent\Builder|SocialDriver whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SocialDriver whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SocialDriver whereDriver($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SocialDriver whereIcon($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SocialDriver whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SocialDriver whereLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SocialDriver whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SocialDriver whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class SocialDriver extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'icon',
        'driver',
        "active",
        "link"
    ];

    protected $hidden = [
        'token',
    ];

    public function account()
    {
        return $this->hasOne(ConnectedAccount::class, "driver", "driver")->latest();
    }
}
