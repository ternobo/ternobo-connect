<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "username" => "required",
            "password" => "required",
        ], [
            "username.required" => "نام کاربری اجباری است",
            "password.required" => "رمزعبور اجباری است",
        ]);

        if ($validator->failed()) {
            return response()->json([
                "result" => false,
                "errors" => $validator->errors(),
            ]);
        }

        $username = $request->username;
        $password = $request->password;

        $admin = Admin::query()->where("username", $username)->first();
        if ($admin instanceof Admin && Hash::check($password, $admin->password)) {
            return response()->json(["result" => true, "api_key" => $admin->createToken('Admin Token')->accessToken]);
        }
        return response()->json(['result' => false]);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json(['result' => true]);
    }



    public function getUser()
    {
        return response()->json(['result' => true, "user" => Auth::user()]);
    }
}
