<?php

namespace App\Http\Controllers;

use App\Rules\DateObject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{
    public function saveAboutMe(Request $request)
    {
        $about = null;
        $experiences = [];
        $educations = [];
        $skills = [];
        $achievements = [];

        if ($request->filled("about")) {
            $about = $request->about;
        }

        /**
         * Handle Experiences
         */
        if ($request->filled("experiences") && (json_decode($request->experiences) != null || is_object($request->experiences))) {
            $msgs = [
                "company.required" => "نام شرکت اجباری است",
                "title.required" => 'عنوان شرکت اجباری است.',
                "startDate.required" => "تاریخ شروع اجباری است",
                "endDate.required" => "تاریخ پایان اجباری است",
            ];
            $experiences = is_object($request->experiences) ? $request->experiences : json_decode($request->experiences);
            foreach ($experiences as $experience) {
                $validator = Validator::validate($experience, [
                    'company' => "required|max:50",
                    'title' => "required|max:60",
                    "startDate" => ["required", new DateObject],
                    "endDate" => ["required", new DateObject],
                ], $msgs);
                if ($validator->fails()) {
                    return response()->json(['result' => false, "type" => "experience", "errors" => $validator->errors()]);
                }
            }
        }

        /**
         * Handle Educations
         */
        if ($request->filled("educations") && (json_decode($request->educations) != null || is_object($request->educations))) {
            $msgs = [
                "school.required" => "محل تحصیل اجباری است",
                "major.required" => "رشته تحصیلی اجباری است",
                "degree.required" => 'مدرک تحصیلی اجباری است',
                "startDate.required" => "تاریخ شروع اجباری است",
                "endDate.required" => "تاریخ پایان اجباری است",
            ];
            $educations = is_object($request->educations) ? $request->educations : json_decode($request->educations);
            foreach ($educations as $education) {
                $validator = Validator::validate($education, [
                    'company' => "required|max:50",
                    'title' => "required|max:60",
                    "startDate" => ["required", new DateObject],
                    "endDate" => ["required", new DateObject],
                ], $msgs);
                if ($validator->fails()) {
                    return response()->json(['result' => false, "type" => "education", "errors" => $validator->errors()]);
                }
            }
        }

        /**
         * Handle Skills
         */
        if ($request->filled("skills") && (json_decode($request->skills) != null || is_array($request->skills))) {
            $skills = is_object($request->skills) ? $request->skills : json_decode($request->skills);
        }

        /**
         *
         */
    }
}
