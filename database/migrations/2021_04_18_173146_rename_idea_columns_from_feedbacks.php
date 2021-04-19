<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RenameIdeaColumnsFromFeedbacks extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('feedback_bookmarks', function (Blueprint $table) {
            $table->renameColumn("idea_id", "feedback_id");
        });
        Schema::table('feedback_replies', function (Blueprint $table) {
            $table->renameColumn("idea_id", "feedback_id");
        });
        Schema::table('feedback_votes', function (Blueprint $table) {
            $table->renameColumn("idea_id", "feedback_id");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('feedbacks', function (Blueprint $table) {
            //
        });
    }
}
