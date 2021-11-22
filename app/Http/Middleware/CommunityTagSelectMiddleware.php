<?php

namespace App\Http\Middleware;

use App\Models\UserOption;
use Closure;
use Illuminate\Http\Request;

class CommunityTagSelectMiddleware
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
        if (filter_var(UserOption::getOption("skip_interests", false), FILTER_VALIDATE_BOOLEAN)) {
            return $next($request);
        }
        return redirect("/interests");
    }
}
