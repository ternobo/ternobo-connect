<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTernobomatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ternobomates', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class);
            $table->timestamps();
        });
        Schema::table('ternobomates', function (Blueprint $table) {
            $table->foreign("user_id")->references("id")->on("users")->onDelete("CASCADE")->onUpdate("CASCADE");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ternobomates');
    }
}
