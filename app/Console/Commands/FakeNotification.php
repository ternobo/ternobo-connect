<?php

namespace App\Console\Commands;

use App\Events\NotificationEvent;
use App\Models\Like;
use App\Models\Notification;
use App\Models\Page;
use App\Models\Post;
use Illuminate\Console\Command;

class FakeNotification extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fake:notitications';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate Fake Notifications';

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
        $notification = new Notification();
        $notification->from = 4;
        $notification->to = 1;

        $notification->action = "like";

        $notification->notificationable_id ="1";
        $notification->notificationable_type = "post";
        $notification->connected_to = null;
        $notification->save();
        event(new NotificationEvent($notification));
        return 0;
    }
}
