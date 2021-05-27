<?php

namespace App\Models;

use App\Scopes\PostDraftScope;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Str;

/**
 * @property mixed|string slug
 */
class Post extends Model
{

    use SoftDeletes;

    use HasFactory;

    protected $dates = ['deleted_at'];

    protected $casts = [
        'tags' => 'array',
        "medias" => 'array',
        "can_tip" => "boolean",
    ];

    protected $fillable = [
        'user_id',
        'page_id',
        'title',
        'tags',
        'type',
        'category_id',
        'medias',
        "show",
        "can_tip",
    ];

    protected $with = ["page", 'likes', 'mutualLikes', 'category', 'slides', "slides.content"];

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

    public function comments()
    {
        return $this->hasMany("App\Models\Comment", "post_id");
    }

    public function notifications()
    {
        return $this->morphMany(Notification::class, "notifiable");
    }

    public function slides()
    {
        return $this->hasMany(PostSlide::class, "post_id");
    }

    public function content()
    {
        return $this->hasManyThrough(PostContent::class, PostSlide::class, "post_id", "slide_id");
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

    public function page()
    {
        return $this->belongsTo("App\Models\Page", "page_id");
    }

    public function category()
    {
        return $this->belongsTo("App\Models\Category");
    }

    public function actions()
    {
        return $this->hasMany(Action::class, "post_id");
    }

    public function bookmarks()
    {
        return $this->belongsToMany('App\Models\User', 'bookmarks', 'post_id', 'user_id');
    }

    public function is_bookmarked()
    {
        return $this->bookmarks->contains(Auth::user());
    }

    public function toArray()
    {
        // get the original array to be displayed
        $data = parent::toArray();
        $data['is_liked'] = false;
        $data['is_bookmarked'] = false;
        if (Auth::check()) {
            if ($this->likes != null) {
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

    public function delete()
    {
        $this->notifications()->delete();
        $this->bookmarks()->delete();
        $this->comments()->delete();
        $this->actions()->delete();
        $this->slides()->delete();
        $this->content()->delete();
        return parent::delete();
    }

    public function mutualLikes()
    {
        if (Auth::check()) {
            return $this->hasMany("App\Models\Like", "post_id")
                ->with("page")
                ->whereHas("page", function ($query) {
                    $query->whereRaw("id in (select following from followings where page_id = ?)", Auth::user()->id);
                })
                ->latest();
        }
        return $this->hasMany("App\Models\Like", "post_id")->where("id", "-1");
    }

    public function likes()
    {
        return $this->hasMany("App\Models\Like", "post_id")
            ->with("page")
            ->latest();
    }

    public static function withDrafts()
    {
        return static::withoutGlobalScope(PostDraftScope::class);
    }

    public function publish()
    {
        return $this->update([
            "type" => substr($this->type, 6),
        ]);
    }

    /**
     * The "booted" method of the model.
     *
     * @return void
     */
    protected static function booted()
    {
        static::addGlobalScope(new PostDraftScope);
    }

}
