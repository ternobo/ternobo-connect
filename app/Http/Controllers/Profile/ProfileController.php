<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use App\Models\AboutData;
use App\Models\Skill;
use App\Rules\DateObject;
use App\Rules\LevelObject;
use App\URLTools;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Facades\Image;

class ProfileController extends Controller
{

    public function setProfile(Request $request)
    {
        $requestValidator = Validator::make($request->all(), [
            'profile' => ["required", "mimes:png,jpg,jpeg,bmp"],
            "sizes" => ["required", 'json'],
        ]);
        if ($requestValidator->passes()) {
            $sizes = json_decode($request->sizes);

            $sizesValidator = Validator::make((array) $sizes, [
                'width' => ["required", "integer", "min:30"],
                'height' => ["required", "integer", "min:30"],
            ]);
            if ($sizesValidator->passes()) {
                $current_profile = substr(str_replace(url('/'), "", Auth::user()->profile), 1);
                Storage::delete($current_profile);
                $file = ($request->file("profile")->store("profiles"));
                $image = Image::make(Storage::disk('local')->getAdapter()->getPathPrefix() . $file);
                $image = $image->crop(intval($sizes->width), intval($sizes->height), intval($sizes->left), intval($sizes->top));
                $image->resize(200, null, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                });
                $image->save();
                $user = $request->user();
                $page = $user->getPage();
                $user->profile = url($file);
                $page->profile = url($file);
                $user->save();
                $page->save();
                return response()->json(array("result" => true, "url" => url($file)));
            }
            return response()->json(array("result" => true, "errors" => $sizesValidator->errors()));
        }
        return response()->json(array("result" => true, "errors" => $requestValidator->errors()));

    }

    public function setCover(Request $request)
    {
        $requestValidator = Validator::make($request->all(), [
            'cover' => ["required", "mimes:png,jpg,jpeg,bmp"],
            "sizes" => ["required", 'json'],
        ]);
        if ($requestValidator->passes()) {
            $sizes = json_decode($request->sizes);

            $sizesValidator = Validator::make((array) $sizes, [
                'width' => ["required", "integer", "min:30"],
                'height' => ["required", "integer", "min:30"],
            ]);
            if ($sizesValidator->passes()) {
                $file = $request->file("cover")->store("profiles");
                $image = Image::make(Storage::disk('local')->getAdapter()->getPathPrefix() . $file);
                $sizes = (json_decode($request->sizes));
                $image = $image->crop(intval($sizes->width), intval($sizes->height), intval($sizes->left), intval($sizes->top));
                $image->resize(794, null, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                });
                $image->save(null, 90, "jpg");
                $user = Auth::user();
                $user->cover = url($file);
                $user->save();
                return response()->json(array("result" => true, "url" => url($file)));
            }
            return response()->json(array("result" => true, "errors" => $sizesValidator->errors()));
        }
        return response()->json(array("result" => true, "errors" => $requestValidator->errors()));
    }

    public function deleteProfileImage()
    {
        $user = Auth::user();
        $user->profile = null;
        $user->save();
        return response()->json(["result" => true, "url" => $user->profile]);
    }

    public function deleteCoverImage()
    {
        $user = Auth::user();
        $user->cover = null;
        $user->save();
        return response()->json(["result" => true, "url" => $user->cover]);
    }

    /**
     * Save About Me data
     */
    public function saveAboutMe(Request $request)
    {
        $about = null;
        $experiences = [];
        $educations = [];
        $skills = [];
        $achievements = null;

        if ($request->filled("about")) {
            $about = $request->about;
        }

        /**
         * Handle Experiences
         */
        if ($request->filled("experiences") && (is_array($request->experiences))) {
            $msgs = [
                "company.required" => "نام شرکت اجباری است.",
                "title.required" => 'عنوان شرکت اجباری است.',
                "startDate.required" => "تاریخ شروع اجباری است.",
            ];
            $experiences = $request->experiences;
            foreach ($experiences as $experience) {
                $validator = Validator::make($experience, [
                    'company' => "required|max:50",
                    'title' => "required|max:60",
                    "startDate" => ["required", new DateObject('تاریخ شروع تجربه نامعتبر است.')],
                    "endDate" => [new DateObject('تاریخ شروع تجربه نامعتبر است.')],
                ], $msgs);
                if ($validator->fails()) {
                    return response()->json(['result' => false, "type" => "experience", "errors" => $validator->errors()]);
                }
            }
        }

        if ($request->filled("skills") && is_array($request->skills)) {
            $skills = $request->skills;
            $user = Auth::user();
            Skill::query()->where("user_id", $user->id)->whereNotIn("name", array_column($skills, "name"))->delete();
            foreach ($skills as $skill) {
                $check = Skill::query()->where("name", $skill['name'])->where("user_id", $user->id)->first();
                if ($check == null) {
                    $theSkill = new Skill();
                    $theSkill->name = $skill['name'];
                    $theSkill->user_id = $user->id;
                    $theSkill->save();
                }
            }

        }

        /**
         * Handle Educations
         */
        if ($request->filled("educations") && (is_array($request->educations))) {
            $msgs = [
                "school.required" => "محل تحصیل اجباری است.",
                "major.required" => "رشته تحصیلی اجباری است.",
                "degree.required" => 'مدرک تحصیلی اجباری است.',
                "startDate.required" => "تاریخ شروع اجباری است.",
            ];
            $educations = $request->educations;
            foreach ($educations as $education) {
                $validator = Validator::make($education, [
                    'school' => "required|max:50",
                    'major' => "required|max:60",
                    'degree' => "required|max:60",
                    "startDate" => ["required", new DateObject('تاریخ پایان تحصیلات نامعتبر است.')],
                    "endDate" => [new DateObject('تاریخ پایان تحصیلات نامعتبر است.')],
                ], $msgs);
                if ($validator->fails()) {
                    return response()->json(['result' => false, "type" => "education", "errors" => $validator->errors()]);
                }
            }
        }

        /**
         * Handle Skills
         */
        if ($request->filled("achievements") && (is_array($request->achievements))) {
            $achievements = (array) $request->achievements;

            $messages = [
                'name.required' => 'نام، {{ type }} اجباری است.',
                'level.required' => 'میزان تسلط به زبان اجباری است.',
                'startDate.required' => 'تاریخ شروع {{ type }} اجباری است.',
                'endDate.required_if' => 'تاریخ پایان {{ type }} اجباری است.',
                'endDate.required' => 'تاریخ پایان {{ type }} اجباری است.',
                'date.required' => 'تاریخ {{ type }} اجباری است.',
                'organization.required' => 'اداره ثبت اختراع اجباری است.',
                'score.max' => 'نمره آزمون حداکثر ۲۰ کاراکتر است.',
                'score.digits_between' => 'نمره آزمون باید عدد باشد',
                'registerCode.max' => "شماره ثبت اختراع نمی‌تواند بیشتر از 30 کاراکتر باشد",
                "registerCode.required" => "شماره ثبت اختراع اجباری است",
                'link.regex' => "لینک {{ type }} نامعتبر است",
            ];

            $errors = [];

            // dd($achievements);
            $validatorRules = [
                'langs' => [
                    'name' => "required|max:50",
                    'level' => ['required', new LevelObject],
                ],
                'awards' => [
                    'name' => "required|max:50",
                    "date" => [new DateObject('تاریخ صدور {{ type }} را تکمیل کنید.')],
                    'link' => ['nullable', 'regex:/(((https?:\/\/)?(www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)|(https?:\/\/)?(www\.)?(?!ww)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)))/'],
                ],
                'projects' => [
                    'name' => "required|max:50",
                    "startDate" => ["required", new DateObject('تاریخ شروع {{ type }} را تکمیل کنید.')],
                    "endDate" => ['required_if:noEndDate,false', new DateObject('تاریخ پایان {{ type }} را تکمیل کنید.')],
                    "noEndDate" => ["boolean"],
                    'link' => ['nullable', 'regex:/(((https?:\/\/)?(www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)|(https?:\/\/)?(www\.)?(?!ww)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)))/'],
                ],
                'publishs' => [
                    'name' => "required|max:50",
                    "date" => ['required', new DateObject('تاریخ پایان {{ type }} را تکمیل کنید.')],
                    'link' => ['nullable', 'regex:/(((https?:\/\/)?(www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)|(https?:\/\/)?(www\.)?(?!ww)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)))/'],
                ],
                'inventions' => [
                    'name' => "required|max:50",
                    "organization" => "required|max:50",
                    "registerCode" => "required|max:30",
                    "date" => [new DateObject('تاریخ ثبت {{ type }} را تکمیل کنید.')],
                    'link' => ['nullable', 'regex:/(((https?:\/\/)?(www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)|(https?:\/\/)?(www\.)?(?!ww)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)))/'],
                ],
                'courses' => [
                    'name' => "required|max:50",
                ],
                'tests' => [
                    'name' => "required|max:50",
                    "score" => "max:20",
                    "date" => [new DateObject('تاریخ پایان {{ type }} را تکمیل کنید.')],
                    'link' => ['nullable', 'regex:/(((https?:\/\/)?(www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)|(https?:\/\/)?(www\.)?(?!ww)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)))/'],
                ],
            ];

            foreach ($achievements as $type => $list) {
                $result = [];
                foreach ($list as $data) {
                    if (isset($data["link"])) {
                        $data['link'] = URLTools::toURL($data['link']);
                    }
                    $validator = Validator::make($data, $validatorRules[$type], $messages);
                    if ($validator->fails()) {
                        return response()->json(['result' => false, "type" => ProfileController::getAchievementTypeName($type), "errors" => $validator->errors()]);
                    }
                    $result[] = $data;
                }
                $achievements[$type] = $result;
            }
        }
        $data = [
            'experiences' => $experiences,
            'educations' => $educations,
            'achievements' => $achievements,
        ];

        $page = Auth::user()->personalPage;
        $page->about = $about;
        $page->save();

        $aboutData = AboutData::query()->where("page_id", $page->id)->firstOrNew();
        $aboutData->page_id = $page->id;
        $aboutData->data = json_encode($data);
        return response()->json(["result" => $aboutData->save()]);

        /**
         *
         */
    }

    public static function getAchievementTypeName($type)
    {
        switch ($type) {
            case 'langs':
                return 'زبان‌';
                break;
            case 'awards':
                return 'جایزه';
                break;
            case 'projects':
                return 'پروژه';
                break;
            case 'publishs':
                return 'انتشار';
                break;
            case 'inventions':
                return 'اختراع';
                break;
            case 'courses':
                return 'دوره';
                break;
            case 'tests':
                return 'آزمون';
                break;
        }
    }

}
