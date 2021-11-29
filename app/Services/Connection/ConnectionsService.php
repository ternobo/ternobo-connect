<?php

namespace App\Services\Connection;

use App\Models\Connection;
use App\Models\Page;
use App\Models\Following;

class ConnectionsService
{
    /**
     * Check if user is following a page
     * 
     * @param $user - Current User or User 
     */
    public function isFollowing($user, $follower)
    {
        $page = Page::where("user_id", $user)->where("type", "personal")->first();
        if ($page instanceof Page) {
            $connection = Following::where("page_id", $follower)->where("following", $page->id);
        }
        return $connection->exists();
    }

    /**
     * check if user is connected to another user.
     */
    public function isConnected($id)
    {
        return Connection::query()->whereRaw("(user_id = '$this->id' AND connection_id = '$id') OR (user_id = '$id' AND connection_id = '$this->id')")->exists();
    }
    /**
     * Check if a connection is accepted by user
     */
    public function isAcceptedConnection($id)
    {
        $connection = Connection::query()->whereRaw("(user_id = '$this->id' AND connection_id = '$id') OR (user_id = '$id' AND connection_id = '$this->id')")->first();
        return ($connection instanceof Connection) ? $connection->accepted : false;
    }
}
