<?php

use App\Models\Tip;
use Illuminate\Database\Migrations\Migration;

class FixTips extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $tips = Tip::all();
        foreach ($tips as $tip) {
            $tip->phone_number = $tip->user->phone;
            $tip->save();
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
