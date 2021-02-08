<?php

namespace App\Console\Commands;

use App\Models\Connection;
use Illuminate\Console\Command;

class AcceptConnections extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'connections:accept {user_id}';

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
        $user_id = $this->argument("user_id");
        $connections = Connection::query()
            ->whereHas("user", function ($query) {
                $query->where("active", true);
            })
            ->whereRaw("(connection = '$user_id' or user_id = '$user_id')")
            ->where("accepted", false)
            ->update([
                'accepted' => true,
            ]);
        return 0;
    }
}
