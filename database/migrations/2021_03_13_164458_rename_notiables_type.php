<?php

use App\Models\Notification;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Str;

class RenameNotiablesType extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $notifications = Notification::query()->get();
        foreach ($notifications as $notification) {
            $notification->notifiable_type = Str::start(Str::ucfirst($notification->notifiable_type), 'App\\Models\\');
            $notification->save();
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
