<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Following;
use App\Models\Page;
use App\Ternobo;
use Illuminate\Support\Facades\Auth;
use Ternobo\TernoboWire\TernoboWire;

class FollowSuggestionController extends Controller
{
    public function __construct()
    {
        $this->middleware('throttle:20,1');
        $this->middleware("auth");
    }

    public function index()
    {
        $followings = Following::query()->where("page_id", Ternobo::currentPage()->id)->count();

        if ($followings > 3) {
            return redirect("/feed");
        }

        return TernoboWire::render("FollowingSuggestion", false);
    }

    public function get()
    {
        $user = Auth::user();
        $user->load("invitedBy");
        $invitedBy = $user->invitedBy;
        $followings = Following::query()->where("page_id", Ternobo::currentPage()->id)->count();
        $first_sort = "";
        $last_sort = "";
        if (isset($invitedBy)) {
            $invitedByPageID = $invitedBy->personalPage->id;
            $first_sort = "id=$invitedByPageID DESC, ";
            $last_sort = ", id IN (select following from followings where page_id=$invitedByPageID) DESC";
        }
        $suggestions = Page::query()->with(['user'])
            ->where("visible", true)
            ->where('id', "!=", $user->personalPage->id)
            ->orderByRaw("$first_sort slug='soroosh' DESC, id IN (select page_id from follow_suggestions) DESC $last_sort")
            ->paginate(24);
        return response()->json(['result' => true, 'pages' => $suggestions, "followings" => $followings]);
    }
}
