<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class FixOldPosts extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $posts = Post::query()->where("type", "post")->get();
        foreach ($posts as $post) {
            $text = $post->text;
            $media = $post->medias != null ? $post->medias[0] : null;
            $slide = PostSlide::create([
                "page_id" => $post->page_id,
                "post_id" => $post->id,
            ]);
            $sort = 0;

            $tags = $post->tags;
            $tagsHTML = "";
            foreach ($tags as $tag) {
                $tagsHTML .= "#$tag";
            }

            if ($text != null && strlen($text) > 0) {
                $content = PostContent::create([
                    "page_id" => $post->page_id,
                    "slide_id" => $slide->id,
                    "text" => $text . "\n\n\n" . $tagsHTML,
                    "media" => null,
                    "type" => "text",
                    "sort" => $sort,
                ]);
                $sort++;
            }
            if ($media != null && strlen($media) > 0) {
                $content = PostContent::create([
                    "page_id" => $post->page_id,
                    "slide_id" => $slide->id,
                    "text" => null,
                    "media" => $media,
                    "type" => "text",
                    "sort" => $sort,
                ]);
            }
            $post->text = null;
            $post->save();
        }
        Post::query()->where("type", "slide")->update(['type' => "post"]);
    }
}
