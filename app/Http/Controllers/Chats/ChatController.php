<?php

namespace App\Http\Controllers\Chats;

use App\FileManager\MediaConverter;
use App\Http\Controllers\Controller;
use App\Models\Conversation;
use Artesaos\SEOTools\Facades\SEOTools;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Ternobo\TernoboWire\TernoboWire;

class ChatController extends Controller
{

    public function index()
    {
        $conversations = Auth::user()->conversations()->with("lastMessage")->latest()->paginate(30);
        SEOTools::setTitle("گفت‌وگو");
        return TernoboWire::render("Chats", [
            'chatsData' => $conversations,
        ]);
    }

    public function chat($id)
    {
        $conversation = Conversation::query()->findOrFail($id);
        $messages = $conversation->messages()->with("sender")->paginate(40);
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
        $conversation = $request->filled("conversation_id") ? Conversation::findOrFail($request->conversation_id) : $user->startConversationWith($request->user_id);
        $conversation_id = $conversation->id;
        $message_type = $request->type;

        $message = null;

        switch ($message_type) {
            case "voice":
                $voiceFile = $request->file("voice");
                $filename = MediaConverter::convertToMP3($voiceFile->store("voices"));
                $user->addMedia([
                    "name" => 'voice',
                    'filename' => $filename,
                    'access' => 'private',
                    'type' => 'chat',
                    'meta' => json_encode([
                        'access' => json_decode($conversation->members),
                    ]),
                ]);
                $message = $user->sendMessage($conversation_id, "voice", null, $filename);
                break;
            case "text":
                $message = $user->sendMessage($conversation_id, "text", $request->message);
                break;
            case "video":
                $mediaFile = $request->file("media");
                $filename = $mediaFile->store("media");
                $user->addMedia([
                    "name" => $mediaFile->originalName,
                    'filename' => $filename,
                    'access' => 'private',
                    'type' => 'chat',
                    'meta' => json_encode([
                        'access' => json_decode($conversation->members),
                    ]),
                ]);
                $message = $user->sendMessage($conversation_id, "video", null, $filename);
                break;
            case "image":
                $mediaFile = $request->file("media");
                $filename = $mediaFile->store("private-media");
                $user->addMedia([
                    "name" => $mediaFile->originalName,
                    'filename' => $filename,
                    'access' => 'private',
                    'type' => 'chat',
                    'meta' => json_encode([
                        'access' => json_decode($conversation->members),
                    ]),
                ]);
                $message = $user->sendMessage($conversation_id, "image", null, $filename);
                break;
            case "audio":
                $mediaFile = $request->file("media")->store("private-media");
                $filename = $mediaFile->store("private-media");
                $user->addMedia([
                    "name" => $mediaFile->originalName,
                    'filename' => $filename,
                    'access' => 'private',
                    'type' => 'chat',
                    'meta' => json_encode([
                        'access' => json_decode($conversation->members),
                    ]),
                ]);
                $message = $user->sendMessage($conversation_id, "audio", null, $filename);
                break;
            case "document":
                $mediaFile = $request->file("media")->store("private-documents");
                $filename = $mediaFile->store("private-documents");
                $user->addMedia([
                    "name" => $mediaFile->originalName,
                    'filename' => $filename,
                    'access' => 'private',
                    'type' => 'chat',
                    'meta' => json_encode([
                        'access' => json_decode($conversation->members),
                    ]),
                ]);
                $message = $user->sendMessage($conversation_id, "document", null, $filename);
                break;
        }

        return response()->json([
            'result' => $message != null,
            'message_id' => $message->id,
        ]);

    }

}
