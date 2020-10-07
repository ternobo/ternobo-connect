<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Following;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FollowMiddlware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // $user = Auth::user();
        // $followings = Following::query()->where("user_id", $user->id)->get();
        // if (count($followings) >= 3) {
            return $next($request);
        // }
        // return redirect("/follow-people");
    }
}
