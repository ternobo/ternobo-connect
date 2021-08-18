<?php

use App\Models\SlideBlock;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
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
        $slides = DB::select("select * from post_contents");
        foreach ($slides as $slide) {
            $content = $slide["text"] != null ? $slide["text"] : $slide['media'];
            DB::update("update post_contents set content = ? where id = ?", [$content, $slide['id']]);
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
