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
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Str;
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

    public function translations()
    {
        $locale = App::getLocale();
        $trans = (collect(File::allFiles(resource_path('lang/' . $locale)))->flatMap(function ($file) use ($locale) {
            $filename = str_replace(".php", "", str_replace(resource_path('lang/' . $locale) . "/", "", $file->getPathname()));
            $key = str_replace("/", ".", $filename);
            $result = trans($filename);
            return [
                "$locale." . $key => $result,
            ];
        }));
        return response()->view("translation", ['trans' => $trans], 200, [
            'Content-Type' => 'application/javascript',
            'version' => Str::uuid(),
            "Pragma" => "no-cache",
            "Cache-Control" => "no-cache, no-store, must-revalidate",
        ]);
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
