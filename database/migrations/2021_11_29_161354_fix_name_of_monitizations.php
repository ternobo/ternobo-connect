<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class FixNameOfMonitizations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table("monitization_requests", function (Blueprint $table) {
            $table->rename("monetization_requests");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table("monetization_requests", function (Blueprint $table) {
            $table->rename("monitization_requests");
        });
    }
}
