<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Http\Controllers;

use App\Models\Following;
use App\Models\FollowSuggestion;
use App\Models\Page;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

/**
 * Description of IndexController
 *
 * @author soroosh
 */
class IndexController extends Controller
{

    public function index()
    {
        $articles = Post::query()->where("type", "article")->with("page")->latest()->limit(10)->get();
        return Inertia::render("Welcome", ["articles"=>$articles]);
    }

    public function followSuggestions(Request $request)
    {
        $more = false;
        $num = 8;
        if ($request->has("more")) {
            $num = 20;
            $more = true;
        }
        $suggestion = FollowSuggestion::query()->with('page')->paginate($num);
        $followings = count(Following::query()->where("user_id", Auth::user()->id)->get());
        if ($followings >= 3) {
            return redirect("/home");
        }
        return view("FollowingSuggestion", ["suggestions" => $suggestion, "followings" => $followings, "more" => $more]);
    }

    public function getToken()
    {
        $CSRFToken = csrf_token();
        return response()->json(["token" => $CSRFToken]);
    }

    public function redirectCategory(Page $page, $category, $id)
    {
        return redirect("/$page->slug/category/$category#$id");
    }

    public function redirectActivities(Page $page)
    {
        return redirect("/$page->slug#activities");
    }

    public function redirectArticles(Page $page)
    {
        return redirect("/$page->slug#articles");
    }

    public function redirectContact(Page $page)
    {
        return redirect("/$page->slug#contact");
    }

    public function getUser(Request $request)
    {
        return $request->user();
    }

}
