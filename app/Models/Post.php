<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;

/**
 * @property mixed|string slug
 */
class Post extends Model
{

    use SoftDeletes;

    use HasFactory;

    protected $dates = ['deleted_at'];

    public static function scriptStripper($input)
    {
        return preg_replace('#<script(.*?)>(.*?)</script>#is', '', $input);
    }

    /**
     * The User which Post this
     * @var \App\User
     */

    /**
     * get reshared post
     * @var \App\Post
     */

    /**
     * Get related Page
     * @var \App\Page
     */

    /**
     * Post Category
     * @var \App\Category
     */

    public function user()
    {
        return $this->belongsTo("App\Models\User");
    }

    public function share()
    {
        $data = $this->belongsTo("App\Models\Post", "post_id")->with("page")
            ->withCount("likes")
            ->with("category");
        if (Auth::check()) {
            $data->with("mutualLikes");
        }
        return $data;
    }

    public function getPublisher()
    {
        return Page::find($this->page_id);
    }

    public function page()
    {
        return $this->belongsTo("App\Models\Page", "page_id");
    }

    public function category()
    {
        return $this->belongsTo("App\Models\Category");
    }

    public function bookmarks()
    {
        return $this->belongsToMany('App\User', 'bookmarks', 'post_id', 'user_id');
    }

    public function is_bookmarked()
    {
        return $this->bookmarks->contains(Auth::user());
    }

    public function getTags()
    {
        return json_decode($this->tags);
    }

    public function getMedia()
    {
        $medias = json_decode($this->medias);
        if (count($medias) === 1) {
            return $medias[0];
        } elseif (count($medias) < 1) {
            return null;
        }
        return $medias;
    }

    public function toArray()
    {
        // get the original array to be displayed
        $data = parent::toArray();

        $data['tags'] = $this->getTags();
        $data['medias'] = $this->getMedia();
        $data['share'] = $this->share;

        $data['is_liked'] = false;
        $data['is_bookmarked'] = false;
        if (Auth::check()) {
            if ($this->likes != null) {
                // dd(array_column(, "page_id"));
                $current_page = json_decode(Cookie::get('ternobo_current_page')) !== null ? json_decode(Cookie::get('ternobo_current_page')) : Auth::user()->personalPage;
                $page_ids = array_column($this->likes->toArray(), "page_id");
                if (in_array($current_page->id, $page_ids)) {
                    $data['is_liked'] = true;
                }
            }
            $bookmark = Bookmark::where("post_id", $data['id'])->where("user_id", Auth::user()->id)->first();
            $data['is_bookmarked'] = $bookmark instanceof Bookmark;
        }
        return $data;
    }

    public function getComments($limit = 10)
    {
        $comments = Comment::query()->whereNull("reply_to")->whereHas("page", function ($query) {
            $query->whereHas("user", function ($query) {
                $query->where("active", true);
            });
        })->where("post_id", $this->id)->latest()->paginate($limit);
        return $comments;
    }

    public function mutualLikes()
    {
        return $this->hasMany("App\Models\Like", "post_id")
            ->with("page")
            ->whereHas("page", function ($query) {
                $query->whereRaw("id in (select following from followings where user_id = ?)", Auth::user()->id);
            })
            ->latest();
    }

    public function likes()
    {
        return $this->hasMany("App\Models\Like", "post_id")
            ->with("page")
            ->latest();
    }

}
