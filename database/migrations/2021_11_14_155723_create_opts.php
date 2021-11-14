<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOpts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('otps', function (Blueprint $table) {
            $table->id();
            $table->string('identifier');
            $table->string('token')->nullable();
            $table->string("verification_token")->unique();
            $table->enum("type", ["global", "iran"]);
            $table->integer('validity')->default(2)->nullable();
            $table->boolean('valid')->default(true);
            $table->boolean("is_verified")->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('otps');
    }
}
