<?php

namespace App\Http\Controllers;

use App\Models\Media;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

/**
 * Description of Downloads
 *
 * @author soroosh
 */
class DownloadsController extends Controller
{

    public function profile($image)
    {
        if (Storage::exists("profiles/$image")) {
            $response = (Storage::download("profiles/$image"));
            return $response;
        }
        return abort(404);
    }

    public function media($image)
    {
        if (Storage::exists("media/$image")) {
            return Storage::response("media/$image", null, ["Content-Type" => Storage::mimeType("media/$image")]);
        }
        return abort(404);
    }

    public function video($video)
    {
        if (Storage::exists("videos/$video")) {
            return Storage::response("videos/$video", null, ["Content-Type" => Storage::mimeType("videos/$video")]);
        }
        return abort(404);
    }

    public function voices($file)
    {
        if (Auth::check()) {
            $mediaAcess = Media::query()->where("filename", "voices/$file")->whereJsonContains("meta->access", Auth::user()->id)->firstOrFail();
            ob_end_clean();
            if (Storage::exists("voices/$file")) {
                $response = new BinaryFileResponse(Storage::path("voices/$file"));
                BinaryFileResponse::trustXSendfileTypeHeader();
                return $response;
            }
        }
        return abort(404);
    }

    public function privateDocuments($file)
    {
        if (Auth::check()) {
            $mediaAcess = Media::query()->where("filename", "private-documents/$file")->whereJsonContains("meta->access", Auth::user()->id)->firstOrFail();
            ob_end_clean();
            if (Storage::exists("private-documents/$file")) {
                return Storage::download("private-documents/$file", $mediaAcess->name);
            }
        }
        return abort(404);
    }

    public function privateMedia($file)
    {
        if (Auth::check()) {
            $mediaAcess = Media::query()->where("filename", "private-media/$file")->whereJsonContains("meta->access", Auth::user()->id)->firstOrFail();
            ob_end_clean();
            if (Storage::exists("private-media/$file")) {
                $response = new BinaryFileResponse(Storage::path("private-media/$file"));
                BinaryFileResponse::trustXSendfileTypeHeader();
                return $response;
            }
        }
        return abort(404);
    }
}
