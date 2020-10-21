<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\ServiceProvider;

class BroadcastServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Broadcast::routes();
        Broadcast::channel('notification.{id}', function (User $user,$id) {
            return (int) $id === $user->personalPage->id;
        });
        require base_path('routes/channels.php');
    }
}
