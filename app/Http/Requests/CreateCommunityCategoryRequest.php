<?php

namespace App\Http\Requests;

use App\Models\Admin;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateCommunityCategoryRequest extends BaseRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Auth::check() && Auth::user() instanceof Admin;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "name" => ['required'],
            "icon" => ['required', 'mimes:png,jpg'],
            "sort" => ['required', 'numeric']
        ];
    }
}
