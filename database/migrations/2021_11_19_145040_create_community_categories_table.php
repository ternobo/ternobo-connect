<?php

use App\Models\CommunityCategory;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommunityCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('community_categories', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->string("icon");
            $table->timestamps();
        });


        Schema::table('community_tags', function (Blueprint $table) {
            $table->foreignIdFor(CommunityCategory::class)->nullable();
            $table->foreign("community_category_id")->references("id")->on("community_categories")->onDelete("CASCADE")->onUpdate("CASCADE");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('community_tags', function (Blueprint $table) {
            $table->dropForeign("community_tags_community_category_id_foreign");
            $table->dropColumn("community_category_id");
        });
        Schema::dropIfExists('community_categories');
    }
}
