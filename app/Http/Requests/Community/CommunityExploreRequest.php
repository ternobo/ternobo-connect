<?php

namespace App\Http\Requests\Community;

use App\Http\Requests\BaseRequest;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CommunityExploreRequest extends BaseRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            "category" => [Rule::exists("community_categories", "id")],
            "sort" => [Rule::in(['activity', "posts"])],
            "search" => ["string", "nullable"]
        ];
    }
}
