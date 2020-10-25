<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreatePosts extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->bigInteger("user_id");
            $table->bigInteger("page_id");
            $table->text("title")->nullable();
            $table->longText("text");
            $table->json("tags")->nullable();
            $table->string("medias");
            $table->bigInteger("category_id")->nullable();
            $table->enum("show", array("private", "public"));
            $table->enum("type", array("article", "post","share"));
            $table->string("slug")->nullable();
            $table->bigInteger("post_id")->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
        DB::statement("ALTER TABLE `posts` ADD FULLTEXT( `title`, `text`);");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('posts');
    }

}
