<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use App\Ternobo;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RedirectIfTernoboUser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  ...$guards
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $condition1 = $request->filled("code") && Ternobo::isUserLogedIn() && Auth::user()->personalPage->visible;
        $condition2 = !$request->filled("code") && Ternobo::isUserLogedIn();

        if ($condition1 || $condition2) {
            return redirect(RouteServiceProvider::HOME);
        }
        return $next($request);
    }
}
