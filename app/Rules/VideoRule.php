<?php

namespace App\Rules;

use Ternobo\FFMpegPHP\Movie;
use Illuminate\Support\Str;
use Illuminate\Http\UploadedFile;
use Illuminate\Http\File;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Storage;

class VideoRule implements Rule
{

    private $msg;
    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $this->msg = __("validation.file", ['attribute' => __("validation.attributes.video"), "values" => "mp4, mkv, m4v"]);
        $validated = true;
        if ($value instanceof UploadedFile) {
            $mime = (mime_content_type($value->path()));
            $fileSize = filesize($value->path()) / 1024;
            if (Str::endsWith($mime, ["mp4", "mkv", "m4v"]) && $fileSize <= 204800) {
                $ffmpeg = new Movie($value->path());
                if ($ffmpeg->getDuration() > 20 * 60) {
                    $this->msg = __("validation.invalid_duration", ['attribute' => __("validation.attributes.video"), "max" => 20]);
                    $validated =  false;
                }
            } elseif ($fileSize > 204800) {
                $this->msg = __("validation.size.file", ['attribute' => __("validation.attributes.video"), "size" => "204800"]);
                $validated =  false;
            } else {
                $validated =  false;
            }
        } elseif (gettype($value) == 'string') {
            $validated = Storage::exists($value);
        }
        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return $this->msg;
    }
}
