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
            $result = trans($filename);
            // foreach ($result as $key => $value) {
            //     if (gettype($value) == "string") {
            //         $result[$key] = preg_replace("/(:)(\w+)/", '{{$2}}', $result[$key]);
            //     } else if (gettype($result) == "array") {
            //         foreach ($result[$key] as $list_key => $value) {
            //             $result[$key][$list_key] = preg_replace("/(:)(\w+)/", '{{$2}}', $result[$key][$list_key]);
            //         }
            //     }
            // }

            return [
                "$locale." . $key => $result,
            ];
        }));
        View::share("trans", $trans);

        return $next($request);
    }
}
