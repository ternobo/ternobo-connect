<?php

namespace App\Console\Commands;

use App\Models\Page;
use App\Models\User;
use App\Models\Following;
use Illuminate\Console\Command;

class FollowAll extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fake:follow';

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
        $users = Page::query()->where("id", "!=", 1)->get();
        foreach($users as $user){
            $following = new Following();
            $following->user_id = 301;
            $following->following = $user->id;
            $following->save();
        }
        return 0;
    }
}
