<?php

namespace App\Http\Requests;

use App\Rules\ImageCropRule;
use App\Rules\UsernameValidator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateUserRequest extends BaseRequest
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
            "firstname" => ["required", "min:2"],
            "lastname" => ["required", "min:2"],
            "nickname" => ['nullable', "min:3", "max:30"],
            'username' => ['required', "min:3", new UsernameValidator()],
            "password" => ["required", "min:8"],
            "password_confirmation" => ["required", "same:password"],
            "gender" => ["required", Rule::in(["1", "2"])],
            "profile" => ['nullable', "mimes:jpg,png,bmp"],
            "sizes" => ["nullable", new ImageCropRule()],
            "verificationToken" => ['required', 'exists:otps,verification_token']
        ];
    }
}
