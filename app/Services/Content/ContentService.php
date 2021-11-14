<?php

namespace App\Services\Content;

use App\Models\Following;
use App\Models\Page;
use App\Models\Post;

class ContentService
{
    /**
     * Get Feed Posts
     * 
     * @param App\Models\Page $page - Page
     * @param App\Models\User $user - User
     * 
     */
    public function getFeedPosts($page = null, $user = null)
    {
        if ($user == null) {
            $user = Auth::user();
        }
        $posts = Post::withRelations();
        if ($page != null && $page->visible) {
            $posts = $posts->leftJoin("content_seens", function ($join) use ($user) {
                $join->on("posts.id", "=", "content_seens.post_id")->where("content_seens.user_id", $user->id);
            })
                ->select(array("posts.*", "content_seens.created_at as seen_at"))
                ->where(function ($query) use ($page, $user) {
                    $query->whereRaw("(posts.page_id IN (select following from followings WHERE page_id = '" . $page->id . "' ) or `posts`.`user_id` = '" . $user->id . "')")
                        ->orWhereJsonContains("posts.tags", Following::query()->where("type", "tag")
                            ->orWhere("page_id", $page->id)->pluck("following"));
                })
                ->whereHas("page.user", function ($query) {
                    $query->where("active", true);
                })
                ->orderByRaw("posts.user_id = '" . Auth::user()->id . "' AND seen_at IS NULL DESC ,seen_at IS NULL DESC ,posts.created_at DESC ,seen_at DESC")
                ->distinct("posts.id")
                ->paginate(20);
        } else {
            $posts = $posts->leftJoin("content_seens", function ($join) use ($user) {
                $join->on("posts.id", "=", "content_seens.post_id")->where("content_seens.user_id", $user->id);
            })->select(["posts.*", "content_seens.created_at as seen_at"])
                ->orderByRaw("seen_at IS NULL DESC, posts.created_at DESC, seen_at DESC")
                ->paginate(20);
        }
        return $posts;
    }
}
