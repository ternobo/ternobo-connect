<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExperiencesTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('experiences', function (Blueprint $table) {
            $table->id();
            $table->bigInteger("user_id");
            $table->string("job_title");
            $table->string("company");
            $table->string("employment_type");
            $table->string("location");
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
        Schema::dropIfExists('experiences');
    }

}
