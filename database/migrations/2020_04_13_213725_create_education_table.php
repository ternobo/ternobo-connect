<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEducationTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('education', function (Blueprint $table) {
            $table->id();
            $table->bigInteger("user_id");
            $table->string("school");
            $table->string("degree");
            $table->string("field");
            $table->string("grade");
            $table->string("description")->nullable();
            $table->timestamp("start_date");
            $table->timestamp("end_date")->nullable();
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
        Schema::dropIfExists('education');
    }

}
