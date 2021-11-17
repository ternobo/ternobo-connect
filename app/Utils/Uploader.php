<?php

namespace App\Utils;

use Intervention\Image\Facades\Image;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class Uploader
{
    public static function uploadImage($data, $folder = 'profiles')
    {
        $image = Image::make($data);
        $image->resize(512, 512);
        $filename = Str::uuid() . ".jpg";
        if (!file_exists(Storage::path($folder))) {
            mkdir(Storage::path($folder), 0775, true);
        }
        $image->save(Storage::path("$folder/" . $filename), 70, "jpg");
        return "/$folder/$filename";
    }
}
