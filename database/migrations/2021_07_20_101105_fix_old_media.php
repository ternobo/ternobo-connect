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
        $contents = DB::select("select * from post_contents");
        foreach ($contents as $content) {
            if ($content['type'] == 'media' && !Str::endsWith($content['content'], ".mp4")) {
                $type = "image";
                DB::update("update post_contents set type = ? where id = ?", [$type, $content['id']]);
            } elseif ($content['type'] == 'media' && Str::endsWith($content['content'], ".mp4")) {
                $type = "video";
                DB::update("update post_contents set type = ? where id = ?", [$type, $content['id']]);
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
