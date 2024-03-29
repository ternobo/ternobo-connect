<?php

namespace App\Http\Requests;

use App\Rules\PhoneNumber;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class IRTipPostRequest extends BaseRequest
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
            "post_id" => ['required', Rule::exists("posts", "id")],
            "amount" => ['required', "numeric", "min:1000"],
            "anonymous" => ['required', 'boolean'],
            'phone' => ['nullable', new PhoneNumber()],
        ];
    }
}
