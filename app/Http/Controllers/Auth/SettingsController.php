<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Models\Verification;
use App\Rules\UsernameValidator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use TaylorNetwork\UsernameGenerator\Facades\UsernameGenerator;

class SettingsController extends Controller
{
    public function check(Request $request)
    {
        $messages = [
            'username.required' => 'نام کاربری اجباری است',
        ];

        $validator = Validator::make($request->all(), [
            'username' => ['required', new UsernameValidator],
        ]);

        if ($validator->fails()) {
            return response()->json(array("valid" => false, "errors" => $validator->errors()));
        }
        return response()->json(array("valid" => true));
    }

    public function set(Request $request)
    {
        $user = Auth::user();

        $messages = [
            'username.required' => 'نام کاربری اجباری است',
        ];

        $validator = Validator::make($request->all(), [
            'username' => ['required', new UsernameValidator],
        ]);

        if ($validator->fails()) {
            return response()->json(array("result" => false, "errors" => $validator->errors()));
        }

        $user->username = strtolower($request->username);
        $user->save();
        return response()->json(['result' => true]);
    }

    public function suggest()
    {
        $user = Auth::user();

        $sluged = Str::slug($user->first_name . " " . $user->last_name);

        $generator = UsernameGenerator::generate($sluged);

        $suggestions = [];

        if ($user->email != null) {
            $parts = explode('@', $user->email);
            if (Page::checkSlug(Str::slug($parts[0]))) {
                array_push($suggestions, $parts[0]);
            }
        }

        if (Page::checkSlug(Str::slug($user->first_name))) {
            array_push($suggestions, Str::slug($user->first_name));
        }
        if (Page::checkSlug(Str::slug($user->last_name))) {
            array_push($suggestions, Str::slug($user->last_name));
        }

        array_push($suggestions, $generator);

        return ['list' => $suggestions];

    }

    public function verifyNewPhone(Request $request)
    {
        if ($request->has("code")) {
            $verification = Verification::query()->where("code", $request->code)->where("phone", session()->get("phone"))->first();
            if ($verification instanceof Verification) {
                $user = Auth::user();
                $user->phone = session()->get("phone");
                $user->save();
                return response()->json(array("result" => true));
            } else {
                return response()->json(array("result" => false, "msg" => __("کد فعال سازی نامعتبر است!")));
            }
        } else {
            abort(402);
        }
    }

    public function verifyNewEmail(Request $request)
    {
        if ($request->has("code")) {
            $verification = Verification::query()->where("code", $request->code)->where("phone", session()->get("email"))->first();
            if ($verification instanceof Verification) {
                $user = Auth::user();
                $user->email = session()->get("email");
                $user->save();
                return response()->json(array("result" => true));
            } else {
                return response()->json(array("result" => false, "msg" => __("کد فعال سازی نامعتبر است!")));
            }
        } else {
            abort(402);
        }
    }

    public function getUserInfo()
    {
        $user = Auth::user();

        return response()->json([
            'email' => $user->email,
            'phone' => $user->phone,
        ]);
    }

    public function changePassword(Request $request)
    {
        $messages = [
            "password" => "رمزعبور فعلی نامعتبر است",
        ];
        $validator = Validator::make($request->all(), [
            'currentpassword' => 'password',
            "password" => "required",
        ], $messages);
        if ($validator->fails()) {
            return response()->json(array("result" => false, "errors" => $validator->errors()));
        }
        $user = Auth::user();
        if (Hash::check($request->currentpassword, $user->password)) {
            $user->password = Hash::make($request->password);
            Auth::logout();
            return response()->json(array("result" => true));
        }
        return response()->json(array("result" => false, "errors" => array("رمزعبور فعلی نامعتبر است")));
    }

    public function deactiveAccount(Request $request)
    {
        $messages = [
            "password" => "رمز عبور نامعتبر است",
        ];
        $validator = Validator::make($request->all(), [
            "password" => "password",
        ], $messages);
        if ($validator->fails()) {
            return response()->json(array("result" => false, "errors" => $validator->errors()));
        }
        $user = Auth::user();
        $user->active = false;
        $user->save();
        Auth::logoutOtherDevices($request->password);
        Auth::logout();
        return response()->json(array("result" => true));
    }

}
