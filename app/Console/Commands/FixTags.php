<?php

namespace App\Console\Commands;

use App\Models\Tag;
use Illuminate\Console\Command;

class FixTags extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fix:tags';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fix Tags';

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
        $tags = Tag::all();
        foreach ($tags as $tag) {
            $tag->name = str_replace(" ", "_", $tag->name);
            $tag->save();
        }
        return 0;
    }
}
