<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;
use App\Models\Admin;

class UpdateCommunityTagRequest extends BaseRequest
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
        $id = ($this->route()->parameter("community"));
        return [
            // Community Tag
            "tag" => ['required', "unique:community_tags,name,$id"],
            "icon" => ['nullable', "mimes:png,jpg"],
            "cover" => ['nullable', "mimes:png,jpg"],
        ];
    }
}
