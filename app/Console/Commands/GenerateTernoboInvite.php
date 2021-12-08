<?php

namespace App\Console\Commands;

use App\Models\InviteLink;
use Illuminate\Console\Command;

class GenerateTernoboInvite extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'generate:ternoboinvite {num}';

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
        $num = (int)$this->argument("num");
        for ($i = 0; $i < $num; $i++) {
            $invite = InviteLink::createLink(null);
            $this->info(url("register?code=" . $invite->code));
        }
        return Command::SUCCESS;
    }
}
