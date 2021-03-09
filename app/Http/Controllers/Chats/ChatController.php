<?php

namespace App\Http\Controllers\Chats;

use App\FileManager\MediaConverter;
use App\Http\Controllers\Controller;
use App\Models\Connection;
use App\Models\Conversation;
use App\Models\Media;
use App\Models\User;
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
        $user = Auth::user();
        $conversations = $user->conversations()->whereHas("messages")->with(["lastMessage"])->withCount(['messages as unread_messages_count' => function ($query) use ($user) {
            $query->where("seen", false)->where("sender_id", "!=", $user->id);
        }])->orderBy('updated_at', 'desc')->paginate(30);

        $connections = Connection::query()
            ->with("user")
            ->with("user.personalPage")
            ->with("user.personalPage.user")

            ->with("connection")
            ->with("connection.personalPage")
            ->with("connection.personalPage.user")

            ->whereRaw("(connection_id = '$user->id' or user_id = '$user->id')")
            ->where("accepted", true)
            ->latest()
            ->paginate(30);
        $connections->appends(['connection' => '1']);

        return response()->json([
            'result' => true,
            'connections' => $connections,
            'chats' => $conversations,
        ]);
    }

    public function chat($id)
    {
        $conversation = Conversation::query()->findOrFail($id);
        // dd(json_encode($conversation->toArray()));
        $messages = $conversation->messages()->with("sender")->paginate(20);

        Message::query()->where("seen", false)->where("conversation_id", $conversation->id)->update(['seen' => true]);

        return response()->json([
            'result' => true,
            'messages' => $messages,
            'conversation' => $conversation->toArray(),
        ]);
    }

    public function search(Request $request)
    {
        $search = $request->q;
        $conversations = Auth::user()->conversations()->with(["lastMessage"])->withCount(['messages as unread_messages_count' => function ($query) {
            $query->where("seen", false)->where("sender_id", Auth::user()->id);
        }])->whereHas("messages", function ($query) use ($search) {
            $query->whereRaw("text like ?", ["%$search%"]);
        })->orderBy('updated_at', 'desc')->paginate(30);

        $user = Auth::user();
        $connections = Connection::query()
            ->with("user")
            ->with("user.personalPage")
            ->with("user.personalPage.user")

            ->with("connection")
            ->with("connection.personalPage")
            ->with("connection.personalPage.user")

            ->whereRaw("(connection_id = '$user->id' or user_id = '$user->id')")
            ->where("accepted", true)
            ->where(function ($query) use ($search) {
                $query->whereHas("user", function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%");
                })->orWhereHas("connection", function ($query) use ($search) {
                    $query->where('name', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(30);
        $connections->appends(['connection' => '1']);

        return response()->json([
            'result' => true,
            'connections' => $connections,
            'conversations' => $conversations,
        ]);
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

    public function getMedia(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'chat_id' => 'required',
            'type' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'result' => false,
                'errors' => $validator->errors(),
            ]);
        }
        $chat_id = $request->chat_id;
        $type = $request->type;
        $media = Media::query()->where("type", "chat")
            ->where("meta->chat_id", $chat_id)
            ->whereJsonContains("meta->access", Auth::user()->id)
            ->where("meta->type", $type)
            ->paginate(30);
        return response()->json([
            'result' => true,
            'media' => $media,
        ]);
    }

    public function muteChat($id)
    {
        $conversation = Conversation::query()->where("id", $id)->whereJsonContains("members", Auth::user()->id)->firstOrFail();
        $result = false;
        $muted = true;
        if ($conversation->isMuted()) {
            $result = $conversation->unmute();
            $muted = false;
        } else {
            $result = $conversation->mute();
        }
        return response()->json([
            "muted" => $muted,
            "result" => $result,
        ]);
    }

    private function mediaMeta($file, $type, $conversation)
    {
        return [
            "mime" => $file->getClientMimeType(),
            "type" => $type,
            'access' => json_decode($conversation->members),
            'chat_id' => $conversation->id,
            'filesize' => $file->getSize(),
        ];
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
                    'meta' => $this->mediaMeta($voiceFile, "voice", $conversation),
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
                    'meta' => $this->mediaMeta($mediaFile, "media", $conversation),
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
                    'meta' => $this->mediaMeta($mediaFile, "media", $conversation),
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
                    'meta' => $this->mediaMeta($mediaFile, "media", $conversation),
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
                    'meta' => $this->mediaMeta($mediaFile, "document", $conversation),
                ]);
                $message = $user->sendMessage($conversation_id, "document", $text, $filename, json_encode([
                    'filename' => $mediaFile->getClientOriginalName(),
                    'filesize' => $mediaFile->getSize(),
                ]));
                break;
            case "contact":
                $contact_id = $request->contact_id;
                $contact = User::query()->findOrFail($contact_id);

                $message = $user->sendMessage($conversation_id, "meta", null, null, json_encode([
                    "type" => "contact",
                    "user" => [
                        "id" => $contact->id,
                        "name" => $contact->first_name . " " . $contact->last_name,
                        "profile" => $contact->profile,
                        "username" => $contact->username,
                        "short_bio" => $contact->short_bio,
                    ],
                ]));
                break;
        }

        return response()->json([
            'result' => $message != null,
            'message' => $message,
        ]);
    }

}
