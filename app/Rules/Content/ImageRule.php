<?php

namespace App\Rules\Content;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Storage;

class ImageRule implements Rule
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
        $this->msg = __("validation.image");
        $validated = true;
        if ($value instanceof UploadedFile) {
            $mime = (mime_content_type($value->path()));
            $fileSize = filesize($value->path()) / 1024;
            $validated = Str::endsWith($mime, ["jpeg", "png", "jpg", "gif"]);
        } elseif (gettype($value) == 'string') {
            $validated = Storage::exists($value);
        }
        return $validated;
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