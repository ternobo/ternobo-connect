<?php

namespace App\Facade;

use App\Services\UploaderService as ServicesUploaderService;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Facade;

/**
 * @method static array uploadPostImage(UploadedFile $media, $quality = 70, $meta = [])
 * @method static string uploadImageWithCrop(UploadedFile $media, object $sizes, int $width = 794) 
 */
class UploaderService extends Facade
{
    protected static function getFacadeAccessor()
    {
        return ServicesUploaderService::class;
    }
}
