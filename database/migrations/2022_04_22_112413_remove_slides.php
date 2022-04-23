<?php

use App\Models\PostSlide;
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
        Schema::table('slide_blocks', function (Blueprint $table) {
            $table->dropForeignIdFor(PostSlide::class);
            $table->dropIndex("slide_blocks_slide_id_foreign");
        });
        Schema::drop("post_slides");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::create('post_slides', function (Blueprint $table) {
            $table->id();
            $table->bigInteger("post_id");
            $table->bigInteger("page_id");
            $table->timestamps();
            $table->softDeletes();
        });
    }
};
