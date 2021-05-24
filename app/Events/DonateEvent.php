<?php

namespace App\Events;

use App\Http\Resources\DonationResource;
use App\Models\Tip;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class DonateEvent implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $tip;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Tip $tip)
    {
        $tip->load("user");
        $this->tip = new DonationResource($tip);
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return [
            new PrivateChannel('donate.post.' . $this->tip->post_id),
            new PrivateChannel('user.' . $this->tip->post->user_id),
            new PrivateChannel('user.' . $this->tip->user_id),
        ];
    }
}
