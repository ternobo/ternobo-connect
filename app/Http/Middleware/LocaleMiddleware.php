<?php

namespace App\Http\Middleware;

use Closure;
use Inertia\Inertia;
use Illuminate\Http\Request;

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
        if (session()->has("locale")) {
            \App::setLocale(session()->get("locale"));
        } else {
            \App::setLocale("fa");
        }
        return $next($request);
    }
}
