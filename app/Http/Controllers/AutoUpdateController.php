<?php

namespace App\Http\Controllers;

use App\Jobs\GitPull;
use Illuminate\Http\Request;

class AutoUpdateController extends Controller
{
    public function update(Request $request)
    {
        if ($request->secret == env("GIT_SECRET")) {
            GitPull::dispatch()->delay(now()->addSecond(20));
        }
        return response()->json(['msg' => 'wrong secret', "data" => $request->secret], 401);
    }
}
