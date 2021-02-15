<?php
namespace App\Models;

use Illuminate\Support\Facades\Auth;
use Ternobo\TernoboChat\Models\Conversation as TenoboChatConversation;

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
                if ($data['title'] == null) {
                    $data['showItem'] = false;
                }
            }
        }
        return $data;
    }
}
