<?php

namespace App\Console\Commands;

use App\Models\Post;
use App\Models\PostBlock;
use App\Models\PostSlide;
use Illuminate\Console\Command;

class FixOldPosts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fix:old_posts';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fix Old Posts';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $posts = Post::withRelations()->where("type", "post")->get();
        foreach ($posts as $post) {
            $text = $post->text;
            $media = $post->media != null ? $post->media[0] : null;
            $slide = PostSlide::create([
                "page_id" => $post->page_id,
                "post_id" => $post->id,
            ]);
            $sort = 0;

            $tags = $post->tags->pluck("name");
            $tagsHTML = "";
            foreach ($tags as $tag) {
                $tagtext = str_replace(" ", "_", $tag);
                $tagsHTML .= "#$tagtext ";
            }

            if ($text != null && strlen($text) > 0) {
                $content = PostBlock::create([
                    "page_id" => $post->page_id,
                    "slide_id" => $slide->id,
                    "content" => $text . "\n\n\n" . $tagsHTML,
                    "type" => "text",
                    "sort" => $sort,
                ]);
                $sort++;
            }
            if ($media != null && strlen($media) > 0) {
                $content = PostBlock::create([
                    "page_id" => $post->page_id,
                    "slide_id" => $slide->id,
                    "content" => $media,
                    "type" => "media",
                    "sort" => $sort,
                ]);
            }
            $post->text = null;
            $post->save();
        }
        Post::withRelations()->where("type", "slide")->update(['type' => "post"]);
        return 0;
    }
}
