<?php

use App\Models\Following;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPageIdToFollowings extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('followings', function (Blueprint $table) {
            $table->renameColumn("user_id", "page_id");
        });

        $followings = Following::all();
        foreach ($followings as $following) {
            $page = User::find($following->page_id)->personalPage;
            $following->page_id = $page->id;
            $following->save();
        }

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('followings', function (Blueprint $table) {
            //
        });
    }
}
