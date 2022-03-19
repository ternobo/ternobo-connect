<?php

namespace App\Services\Community;

use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class CommunitySortQuery
{
    private $sort;

    public function __construct($sort = "posts")
    {
        $this->sort = $sort;
    }

    public function getSortQuery(Builder $query)
    {
        $fnName = "getSortBy" . Str::camel($this->sort) . "Query";
        if (method_exists($this, $fnName)) {
            return $this->{$fnName}($query);
        }
        return $query;
    }

    public function getSortByPostsQuery(Builder $query)
    {
        return $query
            ->addSelect(DB::raw("SUM(
            (SELECT COUNT(`posts`.`id`) FROM `posts` WHERE `post_tag`.`post_id` = `posts`.`id` AND `posts`.`type` NOT LIKE 'draft_%')
        ) AS `posts_count`"))
            ->join("tags", "tags.id", "=", "community_tags.tag_id")
            ->leftJoin("post_tag", "community_tags.tag_id", "=",  "post_tag.tag_id")
            ->leftJoin("posts", "posts.id", "=", "post_tag.post_id")
            ->whereRaw("`posts`.`deleted_at` is NULL")
            ->groupBy("community_tags.id")
            ->orderByDesc("posts_count");
    }

    public function getSortByActivityQuery(Builder $query)
    {
        return $query
            ->addSelect(DB::raw("SUM(
                (SELECT COUNT(`comments`.`id`) FROM `comments` WHERE `posts`.`id` = `comments`.`post_id` ) +
                (SELECT COUNT(`likes`.`id`) FROM `likes` WHERE `posts`.`id` = `likes`.`post_id`) * 0.25
            ) AS `engagement_rate`"))
            ->join("tags", "tags.id", "=", "community_tags.tag_id")
            ->leftJoin("post_tag", "community_tags.tag_id", "=",  "post_tag.tag_id")
            ->leftJoin("posts", function ($query) {
                return $query->on("posts.id", "=", "post_tag.post_id")
                    ->whereRaw("`posts`.`deleted_at` IS NULL")
                    ->whereRaw("`posts`.`type` NOT LIKE 'draft_%'");
            })
            ->groupBy("community_tags.id")
            ->orderByDesc("engagement_rate");
    }
}
