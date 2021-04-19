<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

class RenameIdea extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::rename("ideas", "feedbacks");
        Schema::rename("idea_bookmarks", "feedback_bookmarks");
        Schema::rename("idea_replies", "feedback_replies");
        Schema::rename("idea_votes", "feedback_votes");

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
