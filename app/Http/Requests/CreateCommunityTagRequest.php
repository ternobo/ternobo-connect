<?php

namespace App\Http\Requests;

use App\Models\Admin;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateCommunityTagRequest extends BaseRequest
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
            // Community Tag
            "tag" => ['required', "unique:community_tags,name"],
            "icon" => ['required', "mimes:png,jpg"],
            "cover" => ["nullable", "mimes:png,jpg"],

            // Category
            "category_id" => ['required', "exists:community_categories,id"],
        ];
    }
}
