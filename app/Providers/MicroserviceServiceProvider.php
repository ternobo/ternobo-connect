<?php

namespace App\Providers;

use App\Services\Poll\PollService;
use Illuminate\Support\ServiceProvider;

class MicroserviceServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(PollService::class, function () {
            return new PollService();
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // TODO
    }
}
