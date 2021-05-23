<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AutoUpdateController extends Controller
{
    public function update(Request $request)
    {
        if ($request->secret == env("GIT_SECRET")) {
            $path = base_path();
            $output = exec("cd $path && git pull && npm run production &" . ' > /dev/null 2>&1 & echo $!');
            return response()->json(['job' => "pid $output", "command" => "cd $path && git pull && npm run production &" . ' > /dev/null 2>&1 & echo $!']);
        }
        return response()->json(['msg' => 'wrong secret', "data" => $request->secret], 401);
    }
}
