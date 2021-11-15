<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class DataAccessMiddleware
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
        if ($request->header("Authorization") == env("EXTRENAL_SERVICE_KEY")) {
            return $next($request);
        }
        return response()->json(["status" => false, "data" => null, "message" => "Unauthorized"], 401);
    }
}
