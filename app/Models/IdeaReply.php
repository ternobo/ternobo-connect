<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;

class IdeaReply extends Model
{
    use SoftDeletes;

    protected $dates = ['deleted_at'];

    public function idea()
    {
        return $this->belongsTo("App\Models\Idea", "idea_id");
    }

    public function user()
    {
        return $this->belongsTo("App\Models\User", "user_id");
    }

    public function likes()
    {
        return $this->hasMany("App\Models\Like", "idea_reply");
    }

    /**
     * Get liked by Text
     * @return string
     */
    public function getLikedBy()
    {
        $myConnection = Like::query()
            ->join("pages", "likes.page_id", "=", "pages.id")
            ->where("likes.idea_reply", $this->id)
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
}
