<?php

namespace App\Providers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\ServiceProvider;

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
        Inertia::share([
            // Synchronously
            'app' => [
                'name' => Config::get('app.name'),
            ],
            "connections"=> function() {
                if(Auth::check()){
                    return Auth::user()->getConnectionsIds();
                }
                return [];
            },
            "followings" => function () {
                if(Auth::check()){
                    $followings = Auth::user()->followings;
                    $output = [];
                    foreach($followings as $following){
                        $output[] = $following->following;
                    }
                    return $output;
                }
                return null;
            }
        ]);
    }
}