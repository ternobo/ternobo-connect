<?php

namespace App\Console\Commands;

use App\Models\Tip;
use Illuminate\Console\Command;

class FakeTip extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fake:tip {nums} {post_id?}';

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
        $numbers = $this->argument("nums");
        $post_id = $this->argument("post_id");
        $overrides = [];
        if ($post_id) {
            $overrides = [
                'post_id' => $post_id,
            ];
        }
        $posts = Tip::factory()->count($numbers)->make($overrides);
        foreach ($posts as $post) {
            $post->save();
        }
        return 0;
    }
}
