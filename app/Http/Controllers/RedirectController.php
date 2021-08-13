<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Ternobo\TernoboWire\TernoboWire;

class RedirectController extends Controller
{
    public function redirect(Request $request)
    {
        $request->validate(['redirect' => ["to", "url"]]);
        return TernoboWire::render("Redirect", ["link" => $request->to]);
    }
}
