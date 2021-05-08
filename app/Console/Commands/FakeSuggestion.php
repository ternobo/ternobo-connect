<?php

namespace App\Console\Commands;

use App\Models\FollowSuggestion;
use App\Models\User;
use Illuminate\Console\Command;

class FakeSuggestion extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fake:suggestion {num}';

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
        $users = User::query()->get()->random($this->argument('num'));
        foreach ($users as $user) {
            $suggestion = new FollowSuggestion();
            $suggestion->page_id = $user->personalPage->id;
            $suggestion->save();
        }
        return 0;
    }
}
