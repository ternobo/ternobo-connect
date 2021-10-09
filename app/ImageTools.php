<?php

namespace App;

use Intervention\Image\Facades\Image;

class ImageTools
{
    /**
     * Rotate and Save Image
     * @param string $image
     * @param float $degree
     */
    public static function rotateImage(string $image, float $degree)
    {
        $img = Image::make($image);
        $img->rotate($degree);
        $img->save();
    }

    /**
     * Crop And Save Image
     * @param string $image
     * @param int $height
     * @param int $width
     * @param int $x
     * @param int $y
     */
    public static function crop(string $image, int $height, int $width, int $x, int $y)
    {
        $img = Image::make($image);
        $img->crop($height, $width, $x, $y);
        $img->save();
    }
}
