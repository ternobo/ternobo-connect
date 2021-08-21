<?php

namespace App\Http\Requests;

use App\Rules\Content\ContentBlock;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator as FacadesValidator;
use Illuminate\Validation\Rule;

class PostRequest extends FormRequest
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

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json(['result' => false, 'errors' => $validator->errors()]));
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {

        return [
            "slides" => ['required', 'array', 'min:1', "max:12"],
            "slides.*.blocks" => [new ContentBlock()],
            "slides.*.blocks.*.type" => [Rule::in(['text', 'title', 'code', 'vidoe', 'image'])],
            "deletedSlides" => ["json"],
            "draft" => [Rule::in(['1', '0'])],
            "canDonate" => [Rule::in(['1', '0'])],
        ];
    }
}
