<?php

namespace App\Models;

use App\HasPage;
use App\Scopes\FollowingUsersScope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\Following
 *
 * @property int $id
 * @property int $page_id
 * @property int $following
 * @property string $type
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \App\Models\Page $follower
 * @property-read \App\Models\Page|null $page
 * @property-read \App\Models\Tag|null $tag
 * @method static \Illuminate\Database\Eloquent\Builder|Following newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Following newQuery()
 * @method static \Illuminate\Database\Query\Builder|Following onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Following query()
 * @method static \Illuminate\Database\Eloquent\Builder|Following whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Following whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Following whereFollowing($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Following whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Following wherePageId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Following whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Following whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|Following withTrashed()
 * @method static \Illuminate\Database\Query\Builder|Following withoutTrashed()
 * @mixin \Eloquent
 */
class Following extends Model
{

    use SoftDeletes;
    use HasPage;

    protected $fillable = [
        'page_id',
        "following",
        "type",
    ];

    protected $dates = ['deleted_at'];

    protected $with = ["page"];
    /**
     * return the following user
     *
     * @var \App\Following
     */

    public function page()
    {
        return $this->belongsTo("App\Models\Page", "following")->with("user");
    }

    public function tag()
    {
        return $this->belongsTo("App\Models\Tag", "following");
    }

    public function follower()
    {
        return $this->belongsTo(Page::class, "page_id")->with("user");
    }

    public static function tags()
    {
        return static::withoutGlobalScope(FollowingUsersScope::class)->where("type", "tag");
    }

    public static function withTags()
    {
        return static::withoutGlobalScope(FollowingUsersScope::class);
    }

    protected static function booted()
    {
        static::addGlobalScope(new FollowingUsersScope);
    }

    public function toArray()
    {
        $array = parent::toArray();
        if (isset($this->follower)) {
            $array['follower'] = $this->follower->toArray();
        }
        if (isset($array['following'])) {
            $array['following_id'] = $array['following'];
        }
        if (isset($array['page']) && $array['type'] == 'user') {
            $array['following'] = $array['page'];
            unset($array['page']);
        } elseif ($array['type'] == 'tag') {
            $array['following'] = $array['tag'];
            unset($array['tag']);
        }

        return $array;
    }
}
