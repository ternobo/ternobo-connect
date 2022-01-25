<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class LastActivityJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private $id;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($user_id)
    {
        $this->id = $user_id;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        if (DB::selectOne("SELECT * FROM `last_activities` where `user_id` = ?", [$this->id])) {
            DB::insert("UPDATE `last_activities SET `last_activity` = ? WHERE `user_id` = ?", [Carbon::now()->format("Y-m-d H:i:s"), $this->id]);
        } else {
            DB::insert("INSERT INTO `last_activities`(`user_id`,`last_activity`) VALUES(?,?)", [$this->id, Carbon::now()->format("Y-m-d H:i:s")]);
        }
    }
}
