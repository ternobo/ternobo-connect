<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTernoboToNotifications extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("ALTER TABLE `notifications` CHANGE `action` `action` ENUM('like','report_respond','comment','follow','reply','skill_credit','mention','like_comment','admin','donation', 'ternobo') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL;");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("ALTER TABLE `notifications` CHANGE `action` `action` ENUM('like','report_respond','comment','follow','reply','skill_credit','mention','like_comment','admin','donation') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL;");
    }
}
