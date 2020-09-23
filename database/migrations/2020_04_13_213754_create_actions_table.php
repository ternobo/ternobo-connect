<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateActionsTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('actions', function (Blueprint $table) {
            $table->id();
            $table->bigInteger("page_id");
            $table->bigInteger("post_id");
            $table->enum("action", array("like", "share", "comment", "follow", "post"));
            $table->bigInteger("connected_to")->nullable();
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
        Schema::dropIfExists('actions');
    }

}
