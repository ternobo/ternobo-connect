<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class DataFilterRequest extends BaseRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "filter" => ['array'],
            "filter.*" => ['array'],
            "filter.*.value" => ["required", "string"],
            "filter.*.operator" => ["required", Rule::in(['LIKE', "IN", "=", ">", "<"])],
        ];
    }
}
