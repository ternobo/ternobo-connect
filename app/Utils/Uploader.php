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

    public static function uplaodProfile($file, $sizes, $width = 256): string
    {
        $image = Image::make(Storage::disk(config("ternobo.disk"))->getAdapter()->getPathPrefix() . $file);
        $image = $image->crop(intval($sizes->width), intval($sizes->height), intval($sizes->left), intval($sizes->top));
        $image->resize($width, null, function ($constraint) {
            $constraint->aspectRatio();
            $constraint->upsize();
        });
        $image->save(null, 90, "jpg");
        return "/$file";
    }

    public static function resizeIcon($file, $width = 48, $height = 48)
    {
        $image = Image::make(Storage::disk(config("ternobo.disk"))->getAdapter()->getPathPrefix() . $file);
        $image->resize($width, $height);
        $image->save(null, 90, "png");
        return $file;
    }

    public static function resizeCover($file)
    {
        $image = Image::make(Storage::disk(config("ternobo.disk"))->getAdapter()->getPathPrefix() . $file);
        $image = $image->crop(1140, 336);
        $image->resize(1140, null, function ($constraint) {
            $constraint->aspectRatio();
            $constraint->upsize();
        });

        $image->save(null, 90, "jpg");
        return $file;
    }
}
