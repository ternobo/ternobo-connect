<?php

use App\Broadcasting\AnnouncementChannel;
use App\Broadcasting\DonateChannel;
use App\Broadcasting\LikeChannel;
use App\Broadcasting\NotificationsChannel;
use App\Broadcasting\UserChannel;
use Illuminate\Support\Facades\Broadcast;
use Ternobo\TernoboChat\TernoboChat;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
 */

Broadcast::channel('user.{id}', UserChannel::class);
Broadcast::channel('notification.{id}', NotificationsChannel::class);
Broadcast::channel('donate.post.{id}', DonateChannel::class);
Broadcast::channel('likes.post.{id}', LikeChannel::class);
Broadcast::public('announcements.{id}', AnnouncementChannel::class);

TernoboChat::broadcastChannels();
