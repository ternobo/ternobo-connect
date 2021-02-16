<?php

namespace App\Http\Controllers\Chats;

use App\Http\Controllers\Controller;
use App\Models\Conversation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
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

    public function sendMessage(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "type" => "required",
            "user_id" => "required_without:conversation_id",
            "conversation_id" => "required_without:user_id",
        ]);
        if ($validator->fails()) {
            return response()->json([
                'result' => false,
                'errors' => $validator->errors(),
            ]);
        }

        $user = Auth::user();
        $conversation_id = $request->filled("conversation_id") ? $request->conversation_id : $user->startConversationWith($request->user_id)->id;
        $message_type = $request->type;

        $message = null;

        switch ($message_type) {
            case "voice":
                $voiceFile = $request->file("voice")->store("voices");
                $message = $user->sendMessage($conversation_id, "voice", null, $voiceFile);
                break;
            case "text":
                $message = $user->sendMessage($conversation_id, "text", $request->message);
                break;
            case "video":
                $mediaFile = $request->file("media")->store("private-media");
                $message = $user->sendMessage($conversation_id, "video", null, $mediaFile);
                break;
            case "image":
                $mediaFile = $request->file("media")->store("private-media");
                $message = $user->sendMessage($conversation_id, "image", null, $mediaFile);
                break;
            case "audio":
                $mediaFile = $request->file("media")->store("private-media");
                $message = $user->sendMessage($conversation_id, "audio", null, $mediaFile);
                break;
            case "document":
                $mediaFile = $request->file("media")->store("private-documents");
                $message = $user->sendMessage($conversation_id, "document", null, $mediaFile);
                break;
        }

        return response()->json([
            'result' => $message != null,
            'message_id' => $message->id,
        ]);

    }

}
