<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\App;

/**
 * App\Models\CommunityTag
 *
 * @property int $id
 * @property string $name
 * @property string $icon
 * @property string $cover
 * @property int|null $community_category_id
 * @property int $tag_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $show_in_interst_page
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \App\Models\CommunityCategory|null $communityCategory
 * @property-read \App\Models\Tag $tag
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\CommunityTranslation[] $transactions
 * @property-read int|null $transactions_count
 * @method static \Database\Factories\CommunityTagFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|CommunityTag newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CommunityTag newQuery()
 * @method static \Illuminate\Database\Query\Builder|CommunityTag onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|CommunityTag query()
 * @method static \Illuminate\Database\Eloquent\Builder|CommunityTag whereCommunityCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CommunityTag whereCover($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CommunityTag whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CommunityTag whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CommunityTag whereIcon($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CommunityTag whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CommunityTag whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CommunityTag whereShowInInterstPage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CommunityTag whereTagId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CommunityTag whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|CommunityTag withTrashed()
 * @method static \Illuminate\Database\Query\Builder|CommunityTag withoutTrashed()
 * @mixin \Eloquent
 */
class CommunityTag extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $hidden = [
        'created_at',
        'updated_at',
        'tag_id',
    ];

    protected $fillable = [
        'name',
        'icon',
        'cover',
        'tag_id',
        'community_category_id'
    ];


    public function toArray()
    {
        $data = parent::toArray();
        $locale = App::getLocale();
        $translation = CommunityTranslation::query()->where("tag", $data['name'])->where("locale", $locale)->first();
        $data['name'] = $translation instanceof CommunityTranslation ? $translation->translation : $data['name'];
        $data['tag'] = $this->tag->name;
        return $data;
    }

    public function communityCategory()
    {
        return $this->belongsTo(CommunityCategory::class);
    }

    public function transactions()
    {
        return $this->hasMany(CommunityTranslation::class, 'tag', 'name');
    }

    public function tag()
    {
        return $this->belongsTo(Tag::class);
    }
}
