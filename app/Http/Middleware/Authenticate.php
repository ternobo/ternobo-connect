<?php

namespace App\Http\Middleware;

use App\Models\ActiveSession;
use Closure;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Session;

class Authenticate extends Middleware
{

    public function handle($request, Closure $next, ...$guards)
    {
        if (ActiveSession::checkSession()) {
            return $next($request);
        }
        // StartSession
        Cookie::forget("ternobo_remembered_session_id");
        Cookie::forget("ternobo_current_page_id");
        Auth::logout();
        if ($request->expectsJson()) {
            return response()->json(['error' => 'Unauthenticated.'], 401);
        }
        $request->session()->invalidate();
        return response()->redirectTo("/");
    }

    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        return response()->redirectTo("/");
    }
}
