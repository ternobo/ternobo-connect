<?php

namespace App\Jobs;

use App\Models\User;
use App\Models\UserOption;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class AutomaticDeactivationJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $users_to_deactivate = collect(DB::select('SELECT * FROM `view_user_ids_to_deactivate`'))->pluck("id")->toArray();
        User::query()->whereIn("id", $users_to_deactivate)->update(['active' => 0]);
    }
}
