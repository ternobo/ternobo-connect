<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class NotificationRequest extends FormRequest
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
            "text.required" => "متن اعلان اجباری است",
            "icon.required" => "ایکون اعلان اجباری است",
            "title.required" => "عنوان اعلان اجباری است",
            "report_id.exists" => "آی‌دی گزارش نامعتبر است",
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
            'title' => ['required'],
            "icon" => ["required"],
            "text" => ["required"],
            "to" => ['required_without_all:report_id,to_all', Rule::exists("users", 'id')->whereNull("deleted_at")],
            "to_all" => ['boolean'],
            "report_id" => [Rule::exists("reports", 'id')->whereNull("deleted_at")],
        ];
    }
}
