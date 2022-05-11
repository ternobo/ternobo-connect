<?php

namespace App\Services;

use App\Service\RestfulService;
use App\SocialMediaTools;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;
use Ternobo\FFMpegPHP\Adapters\FFMpegMovie;

class UploaderService
{
    /**
     * Resize and optimize image for web
     *
     * @param $media image path
     * @param $quality
     *
     * @return array new image path
     */
    public static function uploadPostImage(UploadedFile  $media, $quality = 70, $meta = [])
    {
        $result = ['meta' => []];
        $path = Storage::disk("local")->path($media->store("media", ['disk' => "local"]));
        if (!Str::endsWith(Str::lower($path), "gif")) {
            $image = SocialMediaTools::fitPostImage(Image::make($path));
            if (isset($meta['rotate'])) {
                $image->rotate($meta['rotate']);
            }
            $image->save($path, $quality, "webp");
            $result['content'] = Storage::putFile("media", $path);
            $result['meta'] = ['info' => SocialMediaTools::getImageInfo($image)];
        }

        $result['content'] = config("s3.cdn_endpoint") . "/" . config("s3.bucket") . "/" . Storage::putFile("media", $path);
        $result['meta'] = ['info' => SocialMediaTools::getImageInfo($image)];
        unlink($path);
        return $result;
    }


    public function uploadFile(UploadedFile $file)
    {
        return config("s3.cdn_endpoint") . "/" . config("s3.bucket") . "/" . $file->store("files");
    }


    public function uploadVideo(UploadedFile $file)
    {
        $video = new FFMpegMovie($file->getPath());
        $frame = $video->getFrame();
        // dd($video->);
        $file = tmpfile();
        $image = $frame->toGDImage();
        imagepng($image, $file);
        imagedestroy($image);
        $videoFilename = $file->store("files");
        Storage::putFileAs("$videoFilename-files", "thumbnail", $file);
        return config("s3.cdn_endpoint") . "/" . config("s3.bucket") . "/" . $videoFilename;
    }


    /**
     * Crop and upload image
     *
     * @param $media image path
     * @param $quality
     *
     * @return array new image path
     */
    public function uploadImageWithCrop(
        UploadedFile $media,
        object $sizes,
        int $width = 794,
        $path = "media"
    ) {
        $filePath = Storage::disk("local")->path($media->store($path, ['disk' => "local"]));
        $image = Image::make($filePath);
        $image = $image->crop(intval($sizes->width), intval($sizes->height), intval($sizes->left), intval($sizes->top));
        $image->resize($width, null, function ($constraint) {
            $constraint->aspectRatio();
            $constraint->upsize();
        });
        $image->save($filePath, 90, "png");
        $result = Storage::putFile($path, $filePath);
        unlink($filePath);
        return config("s3.cdn_endpoint") . "/" . config("s3.bucket") . "/" . $result;
    }
}
