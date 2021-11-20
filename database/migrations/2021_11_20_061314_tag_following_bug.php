<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class TagFollowingBug extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table("followings", function (Blueprint $table) {
            $table->dropForeign("followings_following_foreign");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table("followings", function (Blueprint $table) {
            $table->foreign("following")->references("id")->on("pages")->onDelete("CASCADE")->onUpdate("CASCADE");
        });
    }
}
