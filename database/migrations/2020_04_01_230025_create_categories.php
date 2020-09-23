<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateCategories extends Migration {

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->bigInteger("page_id");
            $table->string("name");
            $table->enum("type", array("post", "article"));
            $table->unsignedInteger("sort_place")->default(10000);
            $table->timestamps();
            $table->softDeletes();
        });
        DB::statement("ALTER TABLE `pages` ADD FULLTEXT `search` (`name`, `short_bio`, `about`, `slug`, `location`);");
    }

    /**
     * Reverse the migrations.
     *
     * @return void 
     */
    public function down() {
        Schema::dropIfExists('categories');
    }

}
