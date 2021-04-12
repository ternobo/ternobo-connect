<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTitleAndIconToNotifications extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("ALTER TABLE `notifications` CHANGE `action` `action` ENUM('like','report_respond','comment','follow','reply','skill_credit','mention','like_comment','admin') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL;");

        Schema::table('notifications', function (Blueprint $table) {
            $table->string("title")->nullable();
            $table->string("icon")->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('notifications', function (Blueprint $table) {
            //
        });
    }
}
