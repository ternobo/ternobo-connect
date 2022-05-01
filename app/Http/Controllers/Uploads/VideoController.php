<?php

namespace App\Http\Controllers\Uploads;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Raju\Streamer\Helpers\VideoStream;
use Illuminate\Support\Facades\Auth;

class VideoController extends Controller
{

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (Auth::check()) {
            $validator = Validator::make($request->all(), [
                "video" => "required|mimes:mp4|max:30000"
            ], [
                "video.required" => "ویدیو احباری است",
                "video.mimes" => "فقط امکان آپلود فایل mp4 وجود دارد",
                "video.max" => "حداکثر حجم برای آپلود 30 مگابایت است"
            ]);
            if ($validator->fails()) {
                return response()->json(array("result" => false, "errors" => $validator->errors()));
            }
            $file = $request->file("video")->store("videos");
            return response()->json(array("result" => true, "url" => url("/$file")));
        } else {
            return abort(404);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $file = Storage::disk('local')->getAdapter()->getPathPrefix() . "videos/$id";
        if (file_exists($file)) {
            $stream = new VideoStream($file);
            return response()->stream(function () use ($stream) {
                $stream->start();
            });
        }
        return abort(404);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
