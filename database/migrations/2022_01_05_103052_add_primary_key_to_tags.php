<?php

use App\Models\Tag;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class AddPrimaryKeyToTags extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $posts = DB::select("SELECT * from `posts`");
        foreach ($posts as $post) {
            if (isset($post->tags)) {
                $post_id = $post->id;
                $tags = json_decode($post->tags);
                foreach ($tags as $tag) {
                    $tag_id = Tag::query()->firstOrCreate(['name' => $tag])->id;
                    DB::insert("INSERT INTO `post_tag` VALUES('$post_id', $tag_id)");
                }
            }
        }
        Schema::table("posts", function (Blueprint $table) {
            $table->dropColumn("tags");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("TRUNCATE `post_tag`");
    }
}
