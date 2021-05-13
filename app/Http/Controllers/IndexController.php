<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace App\Http\Controllers;

use App\Models\Following;
use App\Models\FollowSuggestion;
use App\Models\Post;
use Artesaos\SEOTools\Facades\SEOTools;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Ternobo\TernoboWire\TernoboWire;

/**
 * Description of IndexController
 *
 * @author soroosh
 */
class IndexController extends Controller
{

    public function index()
    {
        SEOTools::setTitle('شبکه اجتماعی متخصصین');
        $articles = Post::query()->where("type", "article")->with("page")->latest()->limit(10)->get();
        return TernoboWire::render("Welcome", ["articles" => $articles]);
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

    public function getUser(Request $request)
    {
        return $request->user();
    }

    public function checkOnline()
    {
        if (Auth::check()) {
            return response()->json(['result' => true]);
        }
    }

}
