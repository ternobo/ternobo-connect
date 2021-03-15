<?php

namespace App\Http\Controllers\Admin;

use App\Models\Admin;
use App\Models\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
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

        $admin = User::query()->where("username", $username)->where("is_admin", true)->firstOrFail();
        if (Hash::check($password, $admin->password)) {
            $admin->addAPISession();
            $admin->save();
            return response()->json(["result" => true, "api_key" => $api_token]);
        }
        return response()->json(['result' => Hash::check($password, $admin->password)]);
    }
}
