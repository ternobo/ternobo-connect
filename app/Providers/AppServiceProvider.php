<?php

namespace App\Providers;

use App\Models\Page;
use Artesaos\SEOTools\Facades\SEOTools;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {

    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // Multiple values
        if (json_decode(Cookie::get('ternobo_current_page')) == null) {
            if (Auth::check()) {
                Cookie::queue("ternobo_current_page", Auth::user()->personalPage);
            }
        }

        Inertia::share([
            // Synchronously
            'app' => [
                'name' => Config::get('app.name'),
            ],
            "SEO" => function () {
                return SEOTools::generate();
            },
            "connectedPeople" => function () {
                if (Auth::check()) {
                    return Auth::user()->getConnectionsIds();
                }
                return [];
            },
            "waitingConnections" => function () {
                if (Auth::check()) {
                    return Auth::user()->getWaitingConnectionsIds();
                }
                return [];
            },
            "currentPage" => function () {
                if (Auth::check()) {
                    $current_page = json_decode(Cookie::get('ternobo_current_page')) !== null ?
                    Page::query()
                        ->with("categories")
                        ->with("skills")
                        ->find(json_decode(Cookie::get('ternobo_current_page'))->id) :
                    Auth::user()->personalPage()
                        ->with("categories")
                        ->with("skills")
                        ->first();
                    return $current_page;
                }
                return null;

            },
            "followings" => function () {
                if (Auth::check()) {
                    $followings = Auth::user()->followings;
                    $output = [];
                    foreach ($followings as $following) {
                        $output[] = $following->following;
                    }
                    return $output;
                }
                return null;
            }
        ]);
    }
}
