<?php

namespace App\Http\Middleware;

use App\Jobs\LastActivityJob;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LastUserActivity
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (Auth::check()) {
            LastActivityJob::dispatch(Auth::id());
        }
        return $next($request);
    }
}
