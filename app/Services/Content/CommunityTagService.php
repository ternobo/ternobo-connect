<?php

namespace App\Services\Content;

use App\Models\Page;
use App\Services\ServiceAccess;
use App\Models\Post;
use Illuminate\Support\Facades\DB;

class CommunityTagService extends ServiceAccess
{

    public  function getServiceName(): string
    {
        return "ternobo-data/api/v1";
    }


    public function getHashtagTopUsers($tag)
    {
        $data = DB::select("select COUNT(page_id) as post_count, page_id from posts group by page_id order by post_count DESC limit 10");
        $pages_id = array_column($data, "page_id");

        return Page::query()->whereIn("id", $pages_id)->get();
    }
}
