<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddSortAndInterstToCommunityCategories extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('community_categories', function (Blueprint $table) {
            $table->integer("sort", false, true)->default(0);
        });

        Schema::table('community_tags', function (Blueprint $table) {
            $table->boolean("show_in_interst_page")->default(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('community_categories', function (Blueprint $table) {
            $table->dropColumn("sort");
        });
        Schema::table('community_tags', function (Blueprint $table) {
            $table->dropColumn("show_in_interst_page");
        });
    }
}
