<?php

namespace App\Console\Commands;

use App\Models\Following;
use App\Models\Page;
use Illuminate\Console\Command;

class FollowAll extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fake:follow {page}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Follow All Pages';

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
        $auth = $this->argument("page");
        $users = Page::query()->where("id", "!=", $auth)->get();
        foreach ($users as $user) {
            $following = new Following();
            $following->page_id = 301;
            $following->following = $user->id;
            $following->save();
        }
        return 0;
    }
}
