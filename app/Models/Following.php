<?php

namespace App\Models;

use App\HasPage;
use App\Scopes\FollowingUsersScope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

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
