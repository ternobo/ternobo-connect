<?php

namespace App\Http\Controllers\Admin;

use App\Models\Admin;
use App\Models\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "username" => "required",
            "password" => "required"
        ], [
            "username.required" => "نام کاربری اجباری است",
            "password.required" => "رمزعبور اجباری است"
        ]);

        if ($validator->failed()) {
            return response()->json([
                "result" => false,
                "errors" => $validator->errors()
            ]);
        }

        $username = $request->username;
        $password = $request->password;

        $admin = Admin::query()->where("username", $username)->firstOrFail();
        if (Hash::check($password, $admin->password)) {
            $api_token = $admin->generateApiKey();
            $admin->save();
            return response()->json(["result" => true, "api_key" => $api_token]);
        }
        return response()->json(['result' => Hash::check($password, $admin->password)]);
    }
}
