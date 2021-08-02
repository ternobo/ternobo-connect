<?php

namespace App\Http\Requests;

use App\Rules\Video;
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

    private $invalidMedia = false;
    private $errors = [];

    public function validated()
    {
        if ($this->validator->validated()) {
            $request = $this->request;
            $imageRule =  ["mimes:jpeg,png,jpg,gif"];
            $videoRule =  ["mimes:mp4,mkv,m4v", new Video(), "max:200000"];

            $slides = $request->slides;
            $validated = true;
            foreach ($slides as  $slide) {
                $content = $slide->content;
                foreach ($content as $block) {
                    if ($block->type == 'video') {
                        $validator = FacadesValidator::make(['vidoe', $block->content], [
                            'video' => $videoRule,
                        ]);
                        if ($validator->failed()) {
                            $this->errors = array_merge($this->errors, $validator->errors());
                            $this->invalidMedia = true;
                        }
                    } elseif ($block->type == 'image') {
                        $validator = FacadesValidator::make(['image', $block->content], [
                            'image' => $imageRule,
                        ]);
                        if ($validator->failed()) {
                            $this->errors = array_merge($this->errors, $validator->errors());
                            $this->invalidMedia = true;
                        }
                    }
                }
            }
            return count($this->errors) < 1;
        }
        return false;
    }



    protected function failedValidation(Validator $validator)
    {
        if (!$this->invalidMedia) {
            throw new HttpResponseException(response()->json(['result' => false, 'errors' => $validator->errors()]));
        } else {
            throw new HttpResponseException(response()->json(['result' => false, 'errors' => $this->errors]));
        }
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'slides.required' => 'هیچ محتوایی وجود ندارد',
            'slides.array' => 'slides is not array',
            'slides.max' => 'you can\'t have more than 12 slides in one post',
            'slides.*.media.content.mimes' => "فقط امکان فایل‌های jpeg, png, jpg, gif مجاز است",
        ];
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
            "deletedSlides" => ["json"],
            "draft" => [Rule::in(['1', '0'])],
            "canDonate" => [Rule::in(['1', '0'])],
        ];
    }
}
