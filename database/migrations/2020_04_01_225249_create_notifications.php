<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNotifications extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->enum("action", array("like", "report_respond", "comment", "follow", "reply", "skill_credit", "mention"));
            $table->bigInteger("user_id");
            $table->bigInteger("page_id");
            $table->morphs("notifications");
            $table->bigInteger("connected_to")->nullable();
            $table->string("text")->nullable();
            $table->boolean("seen")->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('notifications');
    }

}
