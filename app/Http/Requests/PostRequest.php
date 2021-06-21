<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class PostRequest extends FormRequest
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
        throw new HttpResponseException(response()->json(['result' => false, 'errors' => $validator->errors()]));
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'slides.required' => 'هیچ محتوایی وجود ندارد',
            'slides.array' => 'slides is not array',
            'slides.max' => 'you can\'t have more than 12 slides in one post',
            'slides.*.media.content.mimes' => "فقط امکان فایل‌های jpeg, png, jpg, gif مجاز است",
        ];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "slides" => ['required', 'array', 'min:1', "max:12"],
            "slides.*.media.content" => ["mimes:jpeg,png,jpg,gif"],
            "deletedSlides" => ["json"],
            "draft" => [Rule::in(['1', '0'])],
            "canDonate" => [Rule::in(['1', '0'])],
        ];
    }
}
