<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;

class FakeUsers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fake:users {nums}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate Fake Users';

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
        $users = User::factory()->count($numbers)->make();
        foreach($users as $user){
            $user->generateToken();
            $user->save();
            $page = $user->makePage();
            $page->save();
        }
        return 0;
    }
}
