<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\ActiveSession;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Validator;
use PersianValidator\NationalCode\NationalCode;
use Ternobo\TernoboWire\TernoboWire;

class UsersController extends Controller
{

    public function setPushe_id(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'unique:users,pushe_id',
        ]);
        if ($validator->fails()) {
            return response()->json(array("result" => false, "errors" => $validator->errors()));
        }
        $user = Auth::user();
        $user->pushe_id = $request->id;
        $user->save();
    }

    public function verificationRequest(Request $request)
    {
        $messages = [
            "nationalcode.required" => "کد ملی اجباری است.",
            "file.mimes" => "فایل انتخابی نامعتبر است!",
            "file.max" => "حداکثر حجم فایل 1 مگابایت است.",
            "file.required" => "عکس سلفی با کارت ملی الزامی است",
        ];
        $validator = Validator::make($request->all(), [
            "file" => "required|mimes:jpg,jpeg,png|max:1024",
            "nationalcode" => "required",
        ], $messages);
        if ($validator->fails()) {
            return response()->json(array("result" => false, "errors" => $validator->errors()));
        } else {
            $nationalcode = NationalCode::make($request->nationalcode);
            if ($nationalcode->notValid()) {
                return response()->json(array("result" => false, "errors" => array('code.invalid' => "کدملی نامعتبر است")));
            }
            $user = Auth::user();
            $user->nationalcard = url($request->file("file")->store("nationalcards"));
            $user->nationalcode = $request->nationalcode;
            return response()->json(array("result" => $user->save()));
        }
    }

    public function settingsPage(Request $request)
    {
        return TernoboWire::render("Settings");
    }

    public function logout(Request $request)
    {
        ActiveSession::removeSession();
        Cookie::forget("ternobo_remembered_session_id");
        Cookie::forget("ternobo_current_page_id");
        Auth::logout();
        $request->session()->invalidate();
        return redirect("/");
    }

}
