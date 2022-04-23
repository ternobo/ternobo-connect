<?php

namespace App\Rules\Content;

use Illuminate\Contracts\Validation\Rule as RuleInterface;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ContentBlock implements RuleInterface
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
            "code" => [new CodeBlockRule()],
            "bulletedList" => [new BulletedListRule()],
            "orderedList" => [new OrderedListRule()],
            "quote" => ["max:2200"],
            "text" => ["json", new TextBlockRule()],
            "heading1" => ["max:150"],
            "heading2" => ["max:150"],
            "heading3" => ["max:150"],
            "poll" => [],
            "embed" => ["string", "url"]
        ];
        $typeValidator = validator(["blocks" => $blocks], [
            "blocks.*.type" => [Rule::in(array_keys($rules))]
        ]);


        if ($typeValidator->fails()) {

            $this->errors = $typeValidator->errors()->messages();
            return false;
        }

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
