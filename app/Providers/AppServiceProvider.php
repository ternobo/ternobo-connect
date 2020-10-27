<?php

namespace App\Providers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Cookie;
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
