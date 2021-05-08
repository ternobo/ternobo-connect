<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Following;
use App\Models\Page;
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
        return TernoboWire::render("FollowingSuggestion", false);
    }

    public function get()
    {
        $followings = Following::query()->where("user_id", Auth::user()->id)->count();
        $suggestions = Page::query()->with(['user'])->where('pages.id', "!=", Auth::user()->personalPage->id)
            ->leftJoin("follow_suggestions", "pages.id", "=", "follow_suggestions.page_id")
            ->select(['pages.*', "follow_suggestions.created_at as score"])
            ->orderByRaw("score DESC")
            ->paginate(24);
        return response()->json(['result' => true, 'pages' => $suggestions, "followings" => $followings]);
    }
}
