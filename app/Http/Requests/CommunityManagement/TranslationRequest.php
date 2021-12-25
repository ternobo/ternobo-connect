<?php

namespace App\Http\Requests\CommunityManagement;

use Illuminate\Support\Facades\Auth;
use App\Models\Admin;
use App\Http\Requests\BaseRequest;

class TranslationRequest extends BaseRequest
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

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "locale" => ['required'],
            "tag" => ["required", "exists:community_tags,name"]
        ];
    }
}
