<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\View;

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
            App::setLocale(session()->get("locale"));
        } else {
            App::setLocale("fa");
        }

        $locale = App::getLocale();
        $trans = (collect(File::allFiles(resource_path('lang/' . $locale)))->flatMap(function ($file) use ($locale) {
            $filename = str_replace(".php", "", str_replace(resource_path('lang/' . $locale) . "/", "", $file->getPathname()));
            $key = str_replace("/", ".", $filename);
            return [
                "$locale." . $key => trans($filename),
            ];
        }));
        View::share("trans", $trans);

        return $next($request);
    }
}
