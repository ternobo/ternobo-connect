<?php

namespace App\Console\Commands;

use App\Models\InviteLink;
use App\Models\User;
use Illuminate\Console\Command;

class GenerateInviteLink extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:invite';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create 2 Invite Link for each user';

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
        $users = User::all();
        foreach ($users as $user) {
            InviteLink::createLink($user->id);
            InviteLink::createLink($user->id);
        }

        return 0;
    }
}
