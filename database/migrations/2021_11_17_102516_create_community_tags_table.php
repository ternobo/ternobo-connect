<?php

use App\Models\Tag;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommunityTagsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('community_tags', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->string("icon");
            $table->string("cover");
            $table->foreignIdFor(Tag::class);
            $table->timestamps();
        });

        Schema::table('community_tags', function (Blueprint $table) {
            $table->foreign("tag_id")->references("id")->on("tags")->onDelete("CASCADE")->onUpdate("CASCADE");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('community_tags');
    }
}
