<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class DateObject implements Rule
{

    private $replaces = '';
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($replaces = '')
    {
        $this->replaces = $replaces;
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
        if ($value == null) {
            return true;
        }
        if (is_object($value) || is_array($value)) {
            $value = (object) $value;
            if (isset($value->month) && isset($value->year)) {
                return true;
            }
        } elseif (gettype($value) == 'boolean') {
            return true;
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
        return __('validation.date', $this->replaces);
    }
}
