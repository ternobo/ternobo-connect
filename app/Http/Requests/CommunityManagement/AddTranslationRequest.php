<?php

namespace App\Http\Requests\CommunityManagement;

use App\Http\Requests\BaseRequest;
use Illuminate\Support\Facades\Auth;

class AddTranslationRequest extends BaseRequest
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

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "locale" => ['required'],
            "tag" => ["required", "exists:community_tags,name"],
            "translation" => ["required"]
        ];
    }
}
