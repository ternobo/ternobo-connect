<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\NewUserRequest;
use App\Models\User;
use App\Rules\UsernameValidator;
use App\Tools;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $users = User::withTrashed()
            ->withCount(["followings", 'followers']);

        if ($request->filled("q")) {
            $query = $request->q;
            $users = $users->whereRaw("name like ?", ["%$query%"])->orWhereRaw("username like ?", ["%$query"]);
        }

        $data = $users->paginate();
        if ($request->filled("q")) {
            $data->appends('q', $request->q);
        }

        foreach ($data as $user) {
            $user->makeVisible([
                "deleted_at",
                "two_factor_type",
                "two_factor_recovery_codes",
                "two_factor_secret",
                "two_factor_enabled",
                "two_factor",
                "pushe_id",
                "token",
                "phone",
                "email",
                "created_at",
                "updated_at",
            ]);
        }
        return response()->json(['result' => true, 'data' => $data]);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\User $user
     * @return \Illuminate\Http\Response
     */
    public function show($user)
    {
        $user = User::withTrashed()->where("id", $user)->firstOrFail();
        $user->makeVisible([
            "deleted_at",
            "two_factor_type",
            "two_factor_recovery_codes",
            "two_factor_secret",
            "two_factor_enabled",
            "two_factor",
            "pushe_id",
            "token",
            "phone",
            "email",
            "created_at",
            "updated_at",
        ]);
        $user->loadCount(["followings", 'followers']);
        $user->load(["personalPage.aboutData", "personalPage.contactData"]);
        return response()->json(['result' => true, 'data' => $user]);
    }

    public function store(NewUserRequest $request)
    {
        $user = new User($request->all());
        $user->password = Hash::make($request->password);
        $user->generateToken();
        $user->save();
        $user->makePage()->save();
        return response()->json(['result' => true, "user" => $user]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\User $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $user)
    {
        $user = User::withTrashed()->where("id", $user)->firstOrFail();
        $validator = Validator::make($request->all(), [
            "email" => [Rule::unique("users", "email")->ignore($user->id), "email"],
            "username" => [new UsernameValidator($user->personalPage->id)],
            "phone" => [Rule::unique("users", "phone")->ignore($user->id)],
        ], [
            'email.unique' => "ایمیل تکراری است",
            'phone.unique' => "شماره تماس تکراری است",
            'email.email' => "ایمیل نامعتبر است",
        ]);
        if ($validator->fails()) {
            return response()->json(['result' => false, "errors" => $validator->errors()]);
        }

        $fields = $request->all();
        $result = $user->update($request->all());
        if ($request->filled("password")) {
            $user->password = Hash::make($request->password);
            $result = $user->save();
        }

        return response()->json(['result' => $result]);
    }

    public function verifyUser(User $user)
    {
        if ($user->nationalcard !== null) {
            $user->is_verified = true;
            return response()->json(["result" => $user->save()]);
        }
    }

    /**
     * Deacive Multiple resource from storage.
     *
     * @param \App\User $user
     * @return \Illuminate\Http\Response
     */
    public function activeMultiple(Request $request)
    {
        try {
            $request->validate(['users' => ["required", 'array']]);
            $users = $request->users;
            $result = User::query()->whereIn("id", $users)->restore();

            return response()->json(['result' => $result != 0 && $result != null]);
        } catch (\Exception $e) {
            return response()->json(['result' => false]);
        }
    }

    /**
     * Deacive Multiple resource from storage.
     *
     * @param \App\User $user
     * @return \Illuminate\Http\Response
     */
    public function deactiveMutiple(Request $request)
    {
        try {
            $request->validate(['users' => ["required", 'array']]);
            $users = $request->users;
            $result = User::query()->whereIn("id", $users)->delete();
            return response()->json(['result' => $result != 0 && $result != null]);
        } catch (\Exception $e) {
            return response()->json(['result' => false]);
        }
    }

    public function forceDestory(Request $request)
    {
        try {
            $request->validate(['users' => ["required", 'array']]);
            $users = $request->users;
            $result = User::query()->whereIn("id", $users)->forceDelete();
            return response()->json(['result' => $result != 0 && $result != null]);
        } catch (\Exception $e) {
            return response()->json(['result' => false]);
        }
    }

    /**
     * Handle User About Data update
     */
    private function updateAboutData(User $user, $data)
    {
        $about = null;
        $experiences = [];
        $educations = [];
        $skills = [];
        $achievements = null;
        $objectData = json_decode(json_encode($data));
        if (Tools::filled($data, "about")) {
            $about = $objectData->about;
        }

        /**
         * Handle Experiences
         */
        if (Tools::filled($data, "experiences") && (is_array($data['experiences']))) {
            $msgs = [
                "company.required" => "نام شرکت اجباری است.",
                "title.required" => 'عنوان شرکت اجباری است.',
                "startDate.required" => "تاریخ شروع اجباری است.",
            ];
            $experiences = $objectData->experiences;
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

        if (Tools::filled($data, "skills") && is_array($objectData->skills)) {
            $skills = $objectData->skills;
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
        if (Tools::filled($data, "educations") && is_array($objectData->educations)) {
            $msgs = [
                "school.required" => "محل تحصیل اجباری است.",
                "major.required" => "رشته تحصیلی اجباری است.",
                "degree.required" => 'مدرک تحصیلی اجباری است.',
                "startDate.required" => "تاریخ شروع اجباری است.",
            ];
            $educations = $objectData->educations;
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
        if (Tools::filled($data, "achievements") && is_array($objectData->achievements)) {
            $achievements = (array) $objectData->achievements;

            $messages = [
                'name.required' => 'نام، {{ type }} اجباری است.',
                'level.required' => 'میزان تسلط به زبان اجباری است.',
                'startDate.required' => 'تاریخ شروع {{ type }} اجباری است.',
                'endDate.required' => 'تاریخ پایان {{ type }} اجباری است.',
                'date.required' => 'تاریخ {{ type }} اجباری است.',
                'organization.required' => 'اداره ثبت اختراع اجباری است.',
                'score.required' => 'نمره آزمون اجباری است.',
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
                ],
                'projects' => [
                    'name' => "required|max:50",
                    "startDate" => ["required", new DateObject('تاریخ پایان {{ type }} نامعتبر است.')],
                    "endDate" => ['required', new DateObject('تاریخ پایان {{ type }} نامعتبر است.')],
                ],
                'publishs' => [
                    'name' => "required|max:50",
                    "date" => ["required", new DateObject('تاریخ پایان {{ type }} نامعتبر است.')],
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
                    "date" => ["required", new DateObject('تاریخ پایان {{ type }} نامعتبر است.')],
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
            'experiences' => $experiences,
            'educations' => $educations,
            'achievements' => $achievements,
        ];

        $page = $user->personalPage;
        $page->about = $about;
        $page->save();

        $aboutData = AboutData::query()->where("page_id", $page->id)->firstOrNew();
        $aboutData->page_id = $page->id;
        $aboutData->data = json_encode($data);
        return response()->json(["result" => $aboutData->save()]);
    }

}
