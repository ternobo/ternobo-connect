<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

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
        $ffprobe = FFMpeg\FFProbe::create();
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'The validation error message.';
    }
}
