<?php

namespace App\Http\Controllers;

use App\Jobs\GitPull;
use Illuminate\Http\Request;

class AutoUpdateController extends Controller
{
    public function update(Request $request)
    {
        if ($request->has("secret") && $request->secret == env("GIT_SECRET")) {
            GitPull::dispatch()->delay(now()->addSecond(10));
            return response()->json(['msg' => 'Started'], 200);
        }
        return response()->json(['msg' => 'wrong secret'], 401);
    }
}
