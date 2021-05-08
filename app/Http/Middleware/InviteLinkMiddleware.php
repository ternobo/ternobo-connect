<?php

namespace App\Http\Middleware;

use App\Models\InviteLink;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class InviteLinkMiddleware
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
        if (Auth::guest() && ($request->filled("code") && InviteLink::check($request->code)) || (session("invite_code") != null && InviteLink::check(session("invite_code")))) {
            return $next($request);
        }
        return redirect("/");
    }
}
