<?php

namespace App\Services;

use App\Models\Page;
use Illuminate\Support\Facades\DB;

class ProfileService extends RestfulService
{
    public function checkAboutMeTab(Page $page)
    {
        $aboutData = collect($page->aboutData->data);
        return count($aboutData->flatten()) > 0;
    }

    public function getRandomFollowing(Page $page)
    {
        $ids = collect(DB::select("SELECT `following` FROM `followings` WHERE `page_id` = ? and `type` = 'user' ORDER BY RAND() LIMIT 3", [$page->id]))->pluck("following");
        return Page::query()
            ->whereIn("id", $ids)
            ->get();
    }
}
