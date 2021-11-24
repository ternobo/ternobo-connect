<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class AnnouncementRequest extends BaseRequest
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

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "title" => ['required', "string"],
            "text" => ['required', 'string'],
            "icon" => ['string', "nullable"],
            "user_id" => ['nullable', 'exists:users,id'],
            "has_confetti" => ['boolean']
        ];
    }
}
