<?php

namespace App\Http\Middleware;

use App\Models\ActiveSession;
use Closure;
use Illuminate\Http\Request;

class AdminAPIMiddleware
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
        $api_key = $request->header("api-key");
        if ($api_key != null) {
            $session = ActiveSession::query()->where("token", $api_key)->first();
            if ($session instanceof ActiveSession) {
                return $next($request);
            }
        }
        return abort(401);
    }
}
