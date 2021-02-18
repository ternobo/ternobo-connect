<?php
namespace App\FileManager;

use Illuminate\Support\Facades\Storage;

class MediaConverter
{
    public static function convertToMP3($input)
    {
        $path = Storage::path("$input");
        $output = Storage::path("$input.mp3");
        exec("ffmpeg -i $path $output");
        return "$input.mp3";
    }
}
