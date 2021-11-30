<?php

namespace App\Http\Middleware;

use App\Models\ActiveSession;
use Closure;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Session;

class Authenticate extends Middleware
{

    public function handle($request, Closure $next, ...$guards)
    {
        if (ActiveSession::checkSession()) {
            return $next($request);
        } elseif (Auth::check()) {
            try {
                // Cookie::forget("ternobo_remembered_session_id");
                // Cookie::forget("ternobo_current_page_id");
                // Auth::logout();
            } catch (\Throwable $th) {
                //throw $th;
            }
        }

        if ($request->expectsJson()) {
            return response()->json(['error' => 'Unauthenticated.'], 401);
        }

        return Response::redirectTo("/");
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
