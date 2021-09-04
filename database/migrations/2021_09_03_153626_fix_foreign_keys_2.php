<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class FixForeignKeys2 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table("tips", function (Blueprint $table) {
            $table->unsignedBigInteger("post_id")->change();
            $table->unsignedBigInteger("user_id")->change();

            $table->foreign("post_id")->references("id")->on("posts")->onDelete("CASCADE")->onUpdate("CASCADE");
            $table->foreign("user_id")->references("id")->on("users")->onDelete("CASCADE")->onUpdate("CASCADE");
        });

        Schema::table("transactions", function (Blueprint $table) {
            $table->unsignedBigInteger("user_id")->change();

            $table->foreign("user_id")->references("id")->on("users")->onDelete("CASCADE")->onUpdate("CASCADE");
        });

        Schema::table("skills", function (Blueprint $table) {
            $table->unsignedBigInteger("user_id")->change();

            $table->foreign("user_id")->references("id")->on("users")->onDelete("CASCADE")->onUpdate("CASCADE");
        });

        Schema::table("post_slides", function (Blueprint $table) {
            $table->unsignedBigInteger("post_id")->change();

            $table->foreign("post_id")->references("id")->on("posts")->onDelete("CASCADE")->onUpdate("CASCADE");
        });

        Schema::table("slide_blocks", function (Blueprint $table) {
            $table->unsignedBigInteger("slide_id")->change();

            $table->foreign("slide_id")->references("id")->on("post_slides")->onDelete("CASCADE")->onUpdate("CASCADE");
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
