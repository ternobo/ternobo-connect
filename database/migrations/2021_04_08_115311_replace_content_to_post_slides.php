<?php

use App\Models\PostContent;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ReplaceContentToPostSlides extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $slides = PostContent::all();
        foreach ($slides as $slide) {
            $slide->content = $slide->text != null ? $slide->text : $slide->media;
            $slide->save();
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('post_slides', function (Blueprint $table) {
            //
        });
    }
}
