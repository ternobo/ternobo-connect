<?php

namespace App\Http\Middleware;

use Carbon\Carbon;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class LastUserActivity
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (Auth::check()) {
            DB::delete("DELETE FROM `last_activities` where `user_id` = ?", [Auth::id()]);
            DB::insert("INSERT INTO `last_activities`(`user_id`,`last_activity`) VALUES(?,?)", [Auth::id(), Carbon::now()->format("Y-m-d H:i:s")]);
        }
        return $next($request);
    }
}
