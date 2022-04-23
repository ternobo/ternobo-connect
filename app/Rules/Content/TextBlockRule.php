<?php

namespace App\Rules\Content;

use Illuminate\Contracts\Validation\Rule;
use Tiptap\Editor;

class TextBlockRule implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        try {
            $editor = new Editor();
            $editor->setContent($value);
            return gettype($editor->getHTML()) == "string";
        } catch (\Throwable $th) {
            return false;
        }
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return __("validation.blocks.text");
    }
}
