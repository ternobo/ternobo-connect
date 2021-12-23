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
}
