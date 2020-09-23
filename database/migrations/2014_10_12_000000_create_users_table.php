<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('gender');
            $table->string('short_bio')->nullable();
            $table->string('email')->unique()->nullable();
            $table->string("phone")->unique()->nullable();
            $table->string("token")->unique();
            $table->string("username")->unique();
            $table->string("cover");
            $table->string("profile");
            $table->boolean("2AF")->default(false);
            $table->boolean("active")->default(true);
            $table->string("phone_verified_at")->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password')->nullable();
            $table->string("api_token")->unique();
            $table->string("nationalcard")->nullable();
            $table->string("nationalcode")->nullable();
            $table->boolean("is_verified")->default(false);
            $table->string("pushe_id")->nullable();
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }

}
