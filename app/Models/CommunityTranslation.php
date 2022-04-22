<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\CommunityTranslation
 *
 * @property int $id
 * @property string $tag
 * @property string $translation
 * @property string $locale
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|CommunityTranslation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CommunityTranslation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CommunityTranslation query()
 * @method static \Illuminate\Database\Eloquent\Builder|CommunityTranslation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CommunityTranslation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CommunityTranslation whereLocale($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CommunityTranslation whereTag($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CommunityTranslation whereTranslation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CommunityTranslation whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class CommunityTranslation extends Model
{
    use HasFactory;

    protected $table = "community_tags_translations";

    protected $fillable = [
        'tag',
        'translation',
        'locale'
    ];
}
