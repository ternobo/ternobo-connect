<?php

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class FixOldMediaUrls extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $blocks = DB::select("select id, content from slide_blocks where type='image' or type = 'video'");
        foreach ($blocks as $block) {
            dd($block->id);
            if (Str::startsWith($block->content, "https://" . env("APP_URL") . "/")) {
                $newURL = Str::replace("https://" . env("APP_URL") . "/", "", $block['content']);
                DB::update("update slide_blocks set content = $newURL where id = " . $block->id);
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
        //
    }
}
