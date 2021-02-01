<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateNotifications extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table("notifications", function (Blueprint $table) {
            // $table->renameColumn("notifications_type", "notificationable_type");
            // $table->renameColumn("notifications_id", "notificationable_id");
            // $table->renameColumn("user_id", "from");
            // $table->renameColumn("page_id", "to");
        });
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
