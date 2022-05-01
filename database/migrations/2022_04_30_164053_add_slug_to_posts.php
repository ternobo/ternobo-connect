<?php

use App\Models\Post;
use App\Utils\StringUtils;
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
        $posts = Post::query()->whereNull("slug")->get();
        foreach ($posts as $post) {
            $post->slug = StringUtils::randomCode(8, fn ($code) => !Post::query()->where("slug", $code)->exists());
            $post->save();
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Nothing
    }
};
