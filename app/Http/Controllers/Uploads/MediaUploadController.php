<?php

namespace App\Http\Controllers\Uploads;

use App\FileManager\MediaConverter;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class MediaUploadController extends Controller
{

    public function uploadMedia(Request $request)
    {
        $user = Auth::user();
        $file = $request->file("media");
        $mime = $file->getClientMimeType();
        if (Str::startsWith($mime, 'audio')) {
            $filename = MediaConverter::convertToMP3($voiceFile->store("voices"));
        }

        return response()->json([
            "result" => true,
            "media" => $user->addMedia([
                "name" => 'voice',
                'filename' => $filename,
                'access' => 'public',
                'type' => 'media-manager',
                'meta' => [
                    "mime" => $mime,
                ],
            ]),
        ]);
    }

}
