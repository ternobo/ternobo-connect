<?php

namespace App\Http\Middleware;

use App\Models\ActiveSession;
use Closure;
use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{

    public function handle($request, Closure $next, ...$guards)
    {
        if (ActiveSession::checkSession()) {
            Cookie::forget("ternobo_remembered_session_id");
            Cookie::forget("ternobo_current_page_id");
            Auth::logout();
            if ($request->expectsJson()) {
                return response()->json(['error' => 'Unauthenticated.'], 401);
            }
            return route('welcome');
        }
        return $next($request);
    }

    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {

    }
}
