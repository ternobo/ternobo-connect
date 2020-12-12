<?php

namespace App\Http\Middleware;

use App\Models\ActiveSession;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;

class LocaleMiddleware
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

        if (Auth::check()) {
            if (!ActiveSession::checkSession()) {
                Auth::logout();
                return redirect("/");
            } else {
                Cookie::queue("ternobo_current_page_id", Auth::user()->personalPage->id);
            }
        }

        if (session()->has("locale")) {
            \App::setLocale(session()->get("locale"));
        } else {
            \App::setLocale("fa");
        }
        return $next($request);
    }
}
