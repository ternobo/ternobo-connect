<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Validator;

class ContentBlock implements Rule
{

    private $errors = [];

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $blocks)
    {
        $rules = [
            "video" => [new VideoRule()],
            "image" => [new ImageRule()],
            "text" => ["max:1200"],
            "title" => ["max:150"]
        ];
        foreach ($blocks as $block) {
            $validator = Validator::make($block, [
                'content' => $rules[$block['type']]
            ]);

            if ($validator->fails()) {
                $this->errors = array_merge($this->errors, $validator->messages()->toArray());
            }
        }
        return count($this->errors) < 1;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return $this->errors;
    }
}
