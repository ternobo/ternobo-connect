<?php

namespace App\Http\Controllers;

class HomeController extends Controller
{

    public function setLocale(Request $request)
    {
        if ($request->has("locale")) {
            app()->setLocale($request->input("locale"));
            session()->put("locale", $request->input("locale"));
            return response()->json(array("result" => app()->getLocale($request->input("locale"))));
        }
    }
}
