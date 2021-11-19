<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

class UpdateCommunityTagRequest extends BaseRequest
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
        dd(Request::all());
        return [
            // Community Tag
            "tag" => ['required', "unique:community_tags,name"],
            "icon" => ['required', "mimes:png,jpg"],
            "cover" => ['required', "mimes:png,jpg"],
        ];
    }
}
