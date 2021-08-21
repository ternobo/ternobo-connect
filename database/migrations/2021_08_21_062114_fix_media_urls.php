<?php

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class FixMediaUrls extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $blocks = DB::select("select id, content from slide_blocks where type='image'");
        foreach ($blocks as $block) {
            if (Str::startsWith($block->content, "medias")) {
                $newURL = Str::replace("medias", "media", $block->content);
                DB::update("update slide_blocks set content = ? where id = ?", [$newURL, $block->id]);
            }
        }
        Schema::table("posts", function (Blueprint $table) {
            $table->renameColumn("medias", "media");
        });
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
