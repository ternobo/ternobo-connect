<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePages extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('pages', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->string("user_id");
            $table->string("slug")->unique();
            $table->string("profile");
            $table->string("cover");
            $table->text("short_bio");
            $table->string("location")->nullable();
            $table->string("website")->nullable();
            $table->text("about")->nullable();
            $table->bigInteger("industry")->nullable();
            $table->string("company_size")->nullable();
            $table->timestamp("founded_at")->nullable();
            $table->string("type");
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
        Schema::dropIfExists('pages');
    }

}
