<?php

namespace App\Http\Controllers\Chats;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Ternobo\TernoboChat\Models\Conversation;
use Ternobo\TernoboWire\TernoboWire;

class ChatController extends Controller
{

    public function index()
    {
        $conversations = Auth::user()->conversations()->with("lastMessage")->latest()->paginate(30);
        return TernoboWire::render("Chats", [
            'chatsData' => $conversations,
        ]);
    }

    public function chat($id)
    {
        $conversation = Conversation::query()->findOrFail($id);
        $messages = $conversation->messages()->paginate(40);
        return response()->json([
            'result' => true,
            'messages' => $messages,
            'conversation' => $conversation,
        ]);
    }

    public function sendMessage($user_id, $chat)
    {

    }

}
