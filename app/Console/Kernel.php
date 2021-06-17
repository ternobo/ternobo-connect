<?php

namespace App\Console;

use App\Jobs\CleanDatabase;
use App\Jobs\FreshPasswordResets;
use App\Jobs\FreshVerifications;
use App\Jobs\GitPull;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('backup:clean')->monthly();
        $schedule->command('backup:run --only-to-disk=ftp')->weekly();
        $schedule->job(new CleanDatabase())->yearly();
        $schedule->job(new FreshPasswordResets())->daily();
        $schedule->job(new FreshVerifications())->everyFourHours();
        $schedule->job(new GitPull())->daily();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
