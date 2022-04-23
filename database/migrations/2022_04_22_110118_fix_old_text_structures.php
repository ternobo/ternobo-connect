<?php

use App\Models\Post;
use App\Models\PostSlide;
use App\Models\SlideBlock;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Post::query()->delete();
        DB::statement("TRUNCATE `post_slides`");
        DB::statement("TRUNCATE `slide_blocks`");
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
};
