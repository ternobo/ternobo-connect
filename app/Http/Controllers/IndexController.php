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
use App\Ternobo;
use Artesaos\SEOTools\Facades\SEOTools;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
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
        SEOTools::setTitle(__("seo.ternobo"));
        $articles = Post::query()->where("type", "article")->with("page")->latest()->limit(10)->get();
        return TernoboWire::render("Welcome", ["articles" => $articles]);
    }

    public function setLanguage(Request $request)
    {
        $validator = Validator::make($request->all(), ['locale' => "required"]);
        if ($validator->fails()) {
            return response()->json(['result' => false, 'errors' => $validator->errors()]);
        }

        $locale = $request->locale;
        if (in_array($locale, ['en', 'fa'])) {
            App::setLocale($locale);
            session(["locale" => $locale]);
            return redirect()->back()->withCookie(cookie()->forever("website_locale", $locale));
        }
        return response()->json(['result' => false, 'errors' => ['locale' => "invalid value"]]);
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
        $followings = count(Following::query()->where("page_id", Ternobo::currentPage()->id)->get());
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
