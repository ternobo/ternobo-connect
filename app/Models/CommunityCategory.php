<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\CommunityCategory
 *
 * @property int $id
 * @property string $name
 * @property string $icon
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $sort
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\CommunityTag[] $tags
 * @property-read int|null $tags_count
 * @method static \Database\Factories\CommunityCategoryFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|CommunityCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CommunityCategory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CommunityCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder|CommunityCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CommunityCategory whereIcon($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CommunityCategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CommunityCategory whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CommunityCategory whereSort($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CommunityCategory whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class CommunityCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'icon'
    ];

    public function tags()
    {
        return $this->hasMany(CommunityTag::class);
    }
}
