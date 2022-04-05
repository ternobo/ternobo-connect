<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateMonitizationRequestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('monitization_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class, "user_id")->constrained()->cascadeOnDelete()->cascadeOnUpdate();
            $table->enum("status", ['accepted', 'rejected', 'waiting'])->default("waiting");
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
        Schema::dropIfExists('monitization_requests');
    }
}
