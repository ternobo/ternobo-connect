<?php

namespace App\Http\Controllers;

use App\Models\BlockedPage;

class BlockController extends Controller
{

    public function __construct()
    {
        $this->middleware("auth");
    }

    public function blockPage($page_id)
    {
        return response()->json(["result" => BlockedPage::blockPage($page_id)]);
    }

    public function unblockPage($page_id)
    {
        return response()->json(["result" => BlockedPage::unblockPage($page_id)]);
    }

}
