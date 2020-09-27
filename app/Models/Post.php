<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

/**
 * @property mixed|string slug
 */
class Post extends Model
{

    use SoftDeletes;
    
    use HasFactory;
    protected $dates = ['deleted_at'];

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
        return $this->belongsTo("App\Models\Post", "connected_to");
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
        if (count($medias) > 0) {
            return $medias[0];
        }
        return null;
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

    public function getLikedBy()
    {
        $myConnection = Like::query()
            ->with("page")
            ->where("likes.post_id", $this->id)
            ->latest()
            ->limit(2)
            ->distinct("pages.id");
        if ($this->page_id . "" !== "" . Auth::user()->getPage()->id) {
            $myConnection = $myConnection->whereHas("page", function ($query) {
                $query->whereIn("user_id", Auth::user()->getConnectionsIds());
            });
        }
        $myConnection = $myConnection->get();
        $users = array();
        $response = "";
        if (count($myConnection) > 0) {
            foreach ($myConnection as $like) {
                $user = new \stdClass();
                $user->id = $like->page->user_id;
                $user->name = $like->page->name;
                $user->slug = $like->page->slug;
                $users[] = $user;
            }
            $response = "<text class='clickale' onclick='Ternobo.showLikes(\"$this->id\")'>پسندیده شده توسط </text>";
        }

        $all = count($users);
        $index = 0;
        foreach ($users as $user) {
            if ($user->id . "" === "" . Auth::user()->id) {
                $user->name = "شما";
            }
            $response .= "<a href='$user->slug' class='bold'>$user->name</a>";
            if ($index + 1 < $all) {
                if (count($myConnection) > 2) {
                    $response .= "، ";
                } else {
                    $response .= " و ";
                }
            }
            $index++;
        }
        if (count($myConnection) > 2) {
            $response .= "و ...";
        }
        return $response;
    }

}
