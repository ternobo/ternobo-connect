<?php
namespace App\FileManager;

use Illuminate\Support\Facades\Storage;

class MediaConverter
{
    public static function convertToMP3($input)
    {
        $path = Storage::path("$input");
        $output = Storage::path("$input.mp3");
        if (exec("ffmpeg -i $path $output")) {
            Storage::delete($input);
            return "$input.mp3";
        }
        return $input;
    }
}
