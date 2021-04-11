<?php

namespace App\Http\Requests;

use App\Rules\UsernameValidator;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class NewUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Auth::check() && Auth::user()->is_admin;
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
            "first_name.required" => "نام کاربر اجباری است",
            "last_name.required" => "نام خانوادگی کاربر اجباری است",
            "phone.required" => "شماره موبایل یا ایمیل اجباری است.",
            "email.required" => "شماره موبایل یا ایمیل اجباری است.",
            "email.email" => "ایمیل نامعتبر است",
            "password" => "رمزعبور نامعتبر است",
            "cover.file" => "کاور فقط می‌تواند فایل باشد",
            "profile.file" => "تصویر پروفایل فقط می‌تواند فایل باشد",
            "cover.mimes" => "فقط فرمت تصویر png,jpg,jpeg مجاز است",
            "profile.mimes" => "فقط فرمت تصویر png,jpg,jpeg مجاز است",
            "short_bio.string" => "مقدار عنوان نامعتبر است",
            "password.min" => "رمزعبور حداقل باید 8 کاراکتر باشد",
            "gender.required" => "جنسیت اجباری است",
            "gender.in" => "جنسیت فقط می‌تواند مرد، یا غیره باشد",
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
            "first_name" => ['required', "string", "min:2", "max:12"],
            "last_name" => ['required', "string", "min:2", "max:12"],
            "phone" => ["required_without:email", "digits:11,13"],
            "email" => ['email', "required_without:phone"],
            "username" => [new UsernameValidator(), "required"],
            "password" => ['required', "min:8"],
            "gender" => ['required', Rule::in(['1', '2', '3'])],
            "cover" => ["file", "mimes:png,jpg,jpeg"],
            "profile" => ['file', "mimes:png,jpg,jpeg"],
            "short_bio" => ['string', "max:150"],
            "nationalcode" => ["digits_between:9,14"],
        ];
    }
}
