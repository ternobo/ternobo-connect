<?php

namespace App\Http\Middleware;

use App\Models\ActiveSession;
use App\Models\Following;
use App\Ternobo;
use Closure;
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
        $user = Auth::user();
        if (Ternobo::currentPage()->visible) {
            $followings = Following::query()->where("page_id", Ternobo::currentPage()->id)->count();

            if ($followings >= 3) {
                return $next($request);
            }
            return redirect("/follow-people");
        }
        return $next($request);
    }
}
