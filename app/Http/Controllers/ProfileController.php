<?php

namespace App\Http\Controllers;

use App\Models\AboutData;
use App\Models\Skill;
use App\Rules\DateObject;
use App\Rules\LevelObject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{
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
                "company.required" => "نام شرکت اجباری است",
                "title.required" => 'عنوان شرکت اجباری است.',
                "startDate" => "تاریخ شروع نامعتبر است",
                "endDate" => "تاریخ پایان نامعتبر است",

            ];
            $experiences = $request->experiences;
            foreach ($experiences as $experience) {
                $validator = Validator::make($experience, [
                    'company' => "required|max:50",
                    'title' => "required|max:60",
                    "startDate" => ["required", new DateObject],
                    "endDate" => [new DateObject],
                ], $msgs);
                if ($validator->fails()) {
                    return response()->json(['result' => false, "type" => "experience", "errors" => $validator->errors()]);
                }
            }
        }

        if ($request->filled("skills") && is_array($request->skills)) {
            $skills = $request->skills;
            $user = Auth::user();
            foreach ($skills as $skill) {
                $check = Skill::query()->where("name", $skill['name'])->Where("user_id", $user->id)->first();
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
                "school.required" => "محل تحصیل اجباری است",
                "major.required" => "رشته تحصیلی اجباری است",
                "degree.required" => 'مدرک تحصیلی اجباری است',
                "startDate.required" => "تاریخ شروع اجباری است",
                "endDate" => "تاریخ پایان نامعتبر است",
            ];
            $educations = $request->educations;
            foreach ($educations as $education) {
                $validator = Validator::make($education, [
                    'school' => "required|max:50",
                    'major' => "required|max:60",
                    'degree' => "required|max:60",
                    "startDate" => ["required", new DateObject],
                    "endDate" => [new DateObject],
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
                'name.required' => 'عنوان، نام اجباری است',
                'level' => 'میزان تسلط اجباری است',
                'startDate' => 'تاریخ شروع اجباری است.',
                'date' => 'تاریخ اجباری است',
                'organization' => 'اداره ثبت اختراع اجباری است.',
                'score' => 'نمره آزمون اجباری است',
            ];

            // dd($achievements);
            $validatorRules = [
                'langs' => [
                    'name' => "required|max:50",
                    'level' => ['required', new LevelObject],
                ],
                'awards' => [
                    'name' => "required|max:50",
                ],
                'projects' => [
                    'name' => "required|max:50",
                    "startDate" => ["required", new DateObject],
                    "endDate" => [new DateObject],
                ],
                'publishs' => [
                    'name' => "required|max:50",
                    "date" => ["required", new DateObject],
                    "publisher" => "required|max:50",
                ],
                'inventions' => [
                    'name' => "required|max:50",
                    "organization" => "required|max:50",
                    "registerCode" => "required|numeric",
                ],
                'courses' => [
                    'name' => "required|max:50",
                ],
                'tests' => [
                    'name' => "required|max:50",
                    "score" => "required|numeric",
                    "date" => ["required", new DateObject],
                ],
            ];

            foreach ($achievements as $type => $list) {
                foreach ($list as $data) {
                    $validator = Validator::make($data, $validatorRules[$type], $messages);
                    if ($validator->fails()) {
                        return response()->json(['result' => false, "type" => ProfileController::getTypeName($type), "errors" => $validator->errors()]);
                    }
                }
            }
        }

        $data = [
            'experiences' =>$experiences,
            'educations'=> $educations,
            'achievements'=>$achievements
        ];

        $page = Auth::user()->personalPage;
        $page->about = $about;
        $page->save();

        $aboutData = AboutData::query()->where("page_id", $page->id)->firstOrNew();
        $aboutData->page_id = $page->id;
        $aboutData->data = json_encode($data);
        return response()->json(["result"=>$aboutData->save()]);

        /**
         *
         */
    }

    public static function getTypeName($type)
    {
        switch ($type) {
            case 'langs':
                return 'زبان‌ها';
                break;
            case 'awards':
                return 'جوایز';
                break;
            case 'projects':
                return 'پروژه‌ها';
                break;
            case 'publishs':
                return 'انتشارات';
                break;
            case 'inventions':
                return 'اختراعات';
                break;
            case 'courses':
                return 'دوره‌ها';
                break;
            case 'tests':
                return 'آزمون‌ها';
                break;
        }
    }

}
