<?php

use App\Models\Tip;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddGuestToTips extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tips', function (Blueprint $table) {
            $table->boolean("guest")->default(false)->after("phone_number");
        });
        $tips = Tip::all();
        foreach ($tips as $tip) {
            if ($tip->user_id == null) {
                $tip->guest = true;
                $tip->save();
            }
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tips', function (Blueprint $table) {
            //
        });
    }
}
