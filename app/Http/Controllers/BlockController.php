<?php

namespace App\Http\Controllers;

use App\Models\BlockedPage;
use App\Models\Page;
use Illuminate\Support\Facades\Auth;

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

    public function blockPages()
    {
        $data = Page::query()->whereIn("id", BlockedPage::query()->select(["page_id"])->where("user_id", Auth::user()->id))->paginate(25);
        return response()->json(['result' => true, "data" => $data]);
    }

}
