<?php

namespace App\Console\Commands;

use App\Models\Post;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class FakePosts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fake:posts {nums}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate Fake Posts';

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
        $numbers = $this->argument("nums");
        $posts = Post::factory()->count($numbers)->make();
        foreach ($posts as $post) {
            $post->save();
        }
        return 0;
    }
}
