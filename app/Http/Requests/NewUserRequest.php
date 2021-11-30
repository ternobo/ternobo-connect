<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use App\Rules\UsernameValidator;
use App\Models\Admin;

class NewUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Auth::check()  && Auth::user() instanceof Admin;
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
            "email.unique" => "ایمیل تکراری است",
            "phone.unique" => "شماره موبایل تکراری است",
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
            "phone" => ["required_without:email", Rule::unique("users", "phone"), "digits:11,13"],
            "email" => ['email', Rule::unique("users", "email"), "required_without:phone"],
            "username" => [new UsernameValidator(), "required"],
            "password" => ['required', "min:8"],
            "gender" => ['required', Rule::in(['1', '2', '3'])],
            "cover" => ["file", "mimes:png,jpg,jpeg"],
            "profile" => ['file', "mimes:png,jpg,jpeg"],
            "short_bio" => ['string', "max:150"],
            "nationalcode" => ["digits_between:9,14"],
            "is_admin" => [Rule::in("0", "1")],
        ];
    }
}
