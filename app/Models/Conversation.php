<?php
namespace App\Models;

use Illuminate\Support\Facades\Auth;
use Ternobo\TernoboChat\Models\Conversation as TenoboChatConversation;
use Ternobo\TernoboChat\Models\MutedConversation;

class Conversation extends TenoboChatConversation
{
    public function toArray()
    {
        $data = parent::toArray();
        if (Auth::check()) {
            if (count($data['members']) > 1 && $data['type'] == 'private') {
                $data['user'] = $data['members'][0] == Auth::user()->id ?
                User::query()->where("active", true)->where("id", $data['members'][1])->first()
                : User::query()->where("active", true)->where("id", $data['members'][0])->first();
                if (isset($data['title'])) {
                    if ($data['title'] == null) {
                        $data['showItem'] = false;
                    }
                }
            }
        }
        return $data;
    }

    public function unmute()
    {
        return MutedConversation::query()->where("user_id", Auth::user()->id)->where("conversation_id", $this->id)->delete();
    }

}
