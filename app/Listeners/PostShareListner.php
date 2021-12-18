<?php

namespace App\Listeners;

use App\Events\PostShareEvent;
use App\Jobs\PostProcessJob;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class PostShareListner
{

    /**
     * Handle the event.
     *
     * @param  object  $event
     * @return void
     */
    public function handle(PostShareEvent $event)
    {
        PostProcessJob::dispatch($event->post);
    }
}
