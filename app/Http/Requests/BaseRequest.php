<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class BaseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Auth::check();
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json(['result' => false, 'errors' => $validator->errors()], 422));
    }

    /*
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
    }
}
