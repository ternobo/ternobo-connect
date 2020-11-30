<?php

namespace App\Console\Commands;

use App\Models\Like;
use App\Models\Page;
use Illuminate\Console\Command;

class FakeLike extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fake:like {type} {id} {nums}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

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
        $type = $this->argument("type");
        $id = $this->argument("id");
        $nums = $this->argument("nums");
        for ($i = 0; $i < $nums; $i++) {
            $like = new Like();

            switch ($type) {
                case "post":
                    $like->post_id = $id;
                    break;
                case "comment":
                    $like->comment_id = $id;

                    break;
                case "idea-reply":
                    $like->idea_reply = $id;
                    break;
            }

            $page = Page::all()->random();
            $like->page_id = $page->id;
            $like->save();
        }
        return 0;
    }
}
