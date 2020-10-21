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
            $table->bigInteger("from");
            $table->bigInteger("to");
            $table->morphs("notificationable");
            $table->bigInteger("connected_to")->nullable();
            $table->string("text")->nullable();
            $table->boolean("seen")->default(0);
            $table->timestamps();
            $table->softDeletes();
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
