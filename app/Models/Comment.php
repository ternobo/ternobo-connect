<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;

/**
 *
 * All models are connected to database so just functions are defined and variables variables are dynamic.
 * Variables :
 *      post_id - bookmarked post id
 *      action - \App\Post bookmarked post
 *      created_at - bookmark date
 */
class Comment extends Model
{

    /**
     *  sender page id
     * @var integer
     */

    /**
     *  post id
     * @var integer
     */

    /**
     * the comment which is this comment is replying to
     * @var Comment
     */

    /**
     * Comment parent parent id
     * @var integer
     */

    /**
     *  Comment Text
     * @var string
     */

    /**
     * Comment create date and time
     * @var string
     */

    /**
     * Comment update date and time
     * @var string
     */

    /**
     * Sender Page
     * @return Page
     */
    public function getUser()
    {
        return Page::find($this->page_id);
    }

    public function mutualLikes()
    {
        return $this->hasMany("App\Models\Like", "comment_id")
            ->with("page")
            ->whereHas("page", function ($query) {
                $query->whereRaw("id in (select following from followings where user_id = ?)", Auth::user()->id);
            })
            ->latest();
    }

    public function user()
    {
        return $this->belongsTo("App\Models\User");
    }

    public function page()
    {
        return $this->belongsTo("App\Models\Page");
    }

    public function replyto()
    {
        return $this->belongsTo("App\Models\Comment", "reply_to");
    }

    public function replies()
    {
        return $this->hasMany("App\Models\Comment", "parent_id");
    }

    public function likes()
    {
        return $this->hasMany("App\Models\Like", "comment_id")
            ->with("page")
            ->latest();
    }

    /**
     * Get the comment replies
     * @param integer $action
     * @return type
     */
    public function getReplies($action = 2)
    {
        if ($action === "all") {
            return Comment::query()->where("parent_id", $this->id)->latest()->get();
        }
        return Comment::query()->where("parent_id", $this->id)->latest()->limit(2)->get();
    }

    public function toArray()
    {
        // get the original array to be displayed
        $data = parent::toArray();
        $data['is_liked'] = false;
        if (Auth::check()) {
            if ($this->likes != null) {
                $data['liked_by'] = $this->getLikedBy();
                $current_page = json_decode(Cookie::get('ternobo_current_page')) !== null ? json_decode(Cookie::get('ternobo_current_page')) : Auth::user()->personalPage;
                $page_ids = array_column($this->likes->toArray(), "page_id");
                if (in_array($current_page->id, $page_ids)) {
                    $data['is_liked'] = true;
                }
            }
        }
        return $data;
    }

    /**
     * Get liked by Text
     * @return string
     */
    public function getLikedBy()
    {
        $myConnection = Like::query()
            ->join("pages", "likes.page_id", "=", "pages.id")
            ->where("likes.comment_id", $this->id)
            ->whereIn("pages.user_id", Auth::user()->getConnections())
            ->latest()
            ->limit(2)
            ->select(array("pages.name", "pages.user_id", "pages.slug", "likes.*"))
            ->distinct("page_id")
            ->get();
        $users = array();
        $ids = array();
        $response = "";
        if (count($myConnection) > 0) {
            foreach ($myConnection as $like) {
                if (!in_array($like->slug, $ids)) {
                    $ids[] = $like->slug;
                    $user = new \stdClass();
                    $user->id = $like->user_id;
                    $user->name = $like->name;
                    $user->slug = $like->slug;
                    $users[] = $user;
                }
            }
            $response = "";
        }

        $all = count($users);
        $index = 0;
        foreach ($users as $user) {
            $response .= "<a href='$user->slug' class='text-dark bold'>$user->name</a>";
            if ($index + 1 < $all) {
                $response .= "، ";
            }
        }
        if (count($myConnection) > 2) {
            $response .= "و ...";
        }
        return $response;
    }

    public function notification()
    {
        return $this->hasOne(Notification::class, "connected_to")->where("action", "comment");
    }

    public function delete()
    {
        $this->notification()->delete();
        $this->likes()->delete();
        $this->replies()->delete();
        parent::delete();
    }

}
