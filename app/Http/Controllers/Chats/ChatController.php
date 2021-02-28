<?php

namespace App\Http\Controllers\Chats;

use App\FileManager\MediaConverter;
use App\Http\Controllers\Controller;
use App\Models\Conversation;
use Artesaos\SEOTools\Facades\SEOTools;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Ternobo\TernoboChat\Models\Message;
use Ternobo\TernoboWire\TernoboWire;

class ChatController extends Controller
{

    public function index()
    {
        SEOTools::setTitle("گفت‌وگو");
        return TernoboWire::render("Chats");
    }

    public function getChats()
    {
        $conversations = Auth::user()->conversations()->whereHas("messages")->with(["lastMessage"])->withCount(['messages as unread_messages_count' => function ($query) {
            $query->where("seen", false)->where("sender_id", "!=", Auth::user()->id);
        }])->orderBy('updated_at', 'desc')->paginate(30);
        // dd($conversations);
        return response()->json([
            'result' => true,
            'chats' => $conversations,
        ]);
    }

    public function chat($id)
    {
        $conversation = Conversation::query()->findOrFail($id);
        $messages = $conversation->messages()->with("sender")->paginate(40);

        Message::query()->where("seen", false)->where("conversation_id", $conversation->id)->update(['seen' => true]);

        return response()->json([
            'result' => true,
            'messages' => $messages,
            'conversation' => $conversation,
        ]);
    }

    public function search(Request $request)
    {
        $search = $request->q;

        $conversations = Auth::user()->conversations()->with(["lastMessage"])->withCount(['messages as unread_messages_count' => function ($query) {
            $query->where("seen", false)->where("sender_id", Auth::user()->id);
        }])->whereHas("message", function ($query) use ($search) {
            $query->whereRaw("text like ?", ["%$search%"]);
        })->latest()->paginate(30);

        $user = Auth::user();
        $connections = Connection::query()
            ->whereRaw("(connection = '$user->id' or user_id = '$user->id')")
            ->where("accepted", true)
            ->latest()
            ->paginate(30);

        $data = $connections->data;

        dd($data);
    }

    public function createConversation($user_id)
    {
        $user = Auth::user();
        $conversation = $user->startConversationWith($user_id);
        return response()->json([
            'result' => true,
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
        $conversation = Conversation::findOrFail($request->conversation_id);
        $conversation_id = $conversation->id;
        $message_type = $request->type;

        $message = null;
        $text = null;
        if ($request->filled("text")) {
            $text = $request->text;
        }

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
                        "type" => "voice",
                        'access' => json_decode($conversation->members),
                        'chat_id' => $conversation_id,
                        'filesize' => $mediaFile->getSize(),
                    ]),
                ]);
                $message = $user->sendMessage($conversation_id, "voice", $text, $filename);
                break;
            case "text":
                $message = $user->sendMessage($conversation_id, "text", $text);
                break;
            case "video":
                $mediaFile = $request->file("media");
                $filename = $mediaFile->store("private-media");
                $user->addMedia([
                    "name" => $mediaFile->getClientOriginalName(),
                    'filename' => $filename,
                    'access' => 'private',
                    'type' => 'chat',
                    'meta' => json_encode([
                        "type" => "media",
                        'access' => json_decode($conversation->members),
                        'chat_id' => $conversation_id,
                        'filesize' => $mediaFile->getSize(),
                    ]),
                ]);
                $message = $user->sendMessage($conversation_id, "video", $text, $filename, json_encode([
                    'filename' => $mediaFile->getClientOriginalName(),
                    'filesize' => $mediaFile->getSize(),
                ]));
                break;
            case "image":
                $mediaFile = $request->file("media");
                $filename = $mediaFile->store("private-media");
                $user->addMedia([
                    "name" => $mediaFile->getClientOriginalName(),
                    'filename' => $filename,
                    'access' => 'private',
                    'type' => 'chat',
                    'meta' => json_encode([
                        "type" => "media",
                        'access' => json_decode($conversation->members),
                        'chat_id' => $conversation_id,
                        'filesize' => $mediaFile->getSize(),
                    ]),
                ]);
                $message = $user->sendMessage($conversation_id, "image", $text, $filename, json_encode([
                    'filename' => $mediaFile->getClientOriginalName(),
                    'filesize' => $mediaFile->getSize(),
                ]));
                break;
            case "audio":
                $mediaFile = $request->file("media");
                $filename = $mediaFile->store("private-media");
                $user->addMedia([
                    "name" => $mediaFile->getClientOriginalName(),
                    'filename' => $filename,
                    'access' => 'private',
                    'type' => 'chat',
                    'meta' => json_encode([
                        "type" => "media",
                        'access' => json_decode($conversation->members),
                        'chat_id' => $conversation_id,
                        'filesize' => $mediaFile->getSize(),
                    ]),
                ]);
                $message = $user->sendMessage($conversation_id, "audio", $text, $filename, json_encode([
                    'filename' => $mediaFile->getClientOriginalName(),
                    'filesize' => $mediaFile->getSize(),
                ]));
                break;
            case "document":
                $mediaFile = $request->file("media");
                $filename = $mediaFile->store("private-documents");
                $user->addMedia([
                    "name" => $mediaFile->getClientOriginalName(),
                    'filename' => $filename,
                    'access' => 'private',
                    'type' => 'chat',
                    'meta' => json_encode([
                        "type" => "document",
                        'access' => json_decode($conversation->members),
                        'chat_id' => $conversation_id,
                        'filesize' => $mediaFile->getSize(),
                    ]),
                ]);
                $message = $user->sendMessage($conversation_id, "document", $text, $filename, json_encode([
                    'filename' => $mediaFile->getClientOriginalName(),
                    'filesize' => $mediaFile->getSize(),
                ]));
                break;
        }

        return response()->json([
            'result' => $message != null,
            'message' => $message,
        ]);

    }

}
