<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Foundation\Http\Middleware\PreventRequestsDuringMaintenance as Middleware;

class PreventRequestsDuringMaintenance extends Middleware
{
    /**
     * The URIs that should be reachable while maintenance mode is enabled.
     *
     * @var array
     */
    protected $except = [
        "/ternobo-wire/*",
        "translations.js"
    ];

    public function handle($request, Closure $next)
    {
        if (Cookie::get("website_locale") != null) {
            App::setLocale(Cookie::get("website_locale"));
        }
        return parent::handle($request, $next);
    }
}
