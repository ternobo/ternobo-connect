<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use Ternobo\FFMpegPHP\Movie;

class Video implements Rule
{
    private $max = 1200;

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $ffmpeg = new Movie($value->path());
        if ($ffmpeg->getDuration() > 20 * 60) {
            return false;
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
        return __("validation.invalid_duration", ['attribute' => __("validation.attributes.video"), "max" => 20]);
    }
}
