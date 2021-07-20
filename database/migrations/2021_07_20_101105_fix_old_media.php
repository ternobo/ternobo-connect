<?php

use App\Models\PostContent;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Str;

class FixOldMedia extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $contents = PostContent::all();
        foreach ($contents as $content) {
            if ($content->type == 'media' && !Str::endsWith($content->content, ".mp4")) {
                $content->type = "image";
                $content->save();
            } elseif ($content->type == 'media' && Str::endsWith($content->content, ".mp4")) {
                $content->type = "video";
                $content->save();
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
