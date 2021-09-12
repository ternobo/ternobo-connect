<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class FixForeignKeys3 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table("comments", function (Blueprint $table) {
            $table->unsignedBigInteger("parent_id")->change();
            $table->unsignedBigInteger("reply_to")->change();

            $table->foreign("parent_id")->references("id")->on("comments")->onDelete("CASCADE")->onUpdate("CASCADE");
            $table->foreign("reply_to")->references("id")->on("comments")->onDelete("CASCADE")->onUpdate("CASCADE");
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
