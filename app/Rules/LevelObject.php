<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class LevelObject implements Rule
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
        if(is_object($value) || is_array($value)){
            $value = (object) $value;
            if (isset($value->label) && isset($value->level)) {
                if (gettype($value->level) == 'integer') {
                    return true;
                }
            }
        }
        return false;
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
