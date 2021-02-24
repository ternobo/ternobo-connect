<?php

namespace App\Models;

use Ternobo\TernoboChat\Models\Message as TernoboChatMessage;

class Message extends TernoboChatMessage
{
    public function conversation()
    {
        return $this->belongsTo("App\Models\Conversation");
    }
}
