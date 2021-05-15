<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AutoUpdateController extends Controller
{
    public function update(Request $request)
    {
        if ($request->secret == env("GIT_SECRET")) {
            $path = base_path();
            exec("cd $path && git pull && npm run production");
        }
        return abort(401);
    }
}
