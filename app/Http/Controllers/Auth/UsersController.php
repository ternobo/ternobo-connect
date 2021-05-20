<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\ActiveSession;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Facades\Image;
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

    public function setProfile(Request $request)
    {
        if ($request->has("profile")) {
            if (Auth::check()) {
                $current_profile = substr(str_replace(url('/'), "", Auth::user()->profile), 1);
                Storage::delete($current_profile);
                $file = ($request->file("profile")->store("profiles"));
                //   dd(Storage::disk('local')->getAdapter()->getPathPrefix() . $file);
                $image = Image::make(Storage::disk('local')->getAdapter()->getPathPrefix() . $file);
                if ($request->has("sizes")) {
                    $sizes = (json_decode($request->sizes));
                    $image = $image->crop(intval($sizes->width), intval($sizes->height), intval($sizes->left), intval($sizes->top));
                    $image->save();
                }
                $user = $request->user();
                $page = $user->getPage();
                $user->profile = url($file);
                $page->profile = url($file);
                $user->save();
                $page->save();
                if ($request->has("json")) {
                    return response()->json(array("result" => true, "url" => url($file)));
                }
                return redirect("/home");
            } else {
                return abort(404);
            }
        } else {
            return redirect("/home");
        }
    }

    public function setCover(Request $request)
    {
        if ($request->has("cover") && $request->has("sizes")) {
            if (Auth::check()) {
                $file = $request->file("cover")->store("profiles");
                $image = Image::make(Storage::disk('local')->getAdapter()->getPathPrefix() . $file);
                $sizes = (json_decode($request->sizes));
                $image = $image->crop(intval($sizes->width), intval($sizes->height), intval($sizes->left), intval($sizes->top));
                $image->save(null, 90, "jpg");
                $user = Auth::user();
                $user->cover = url($file);
                $user->save();
                return response()->json(array("result" => true));
            }
            return abort(401);
        }
        return abort(400);
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

    public function logout()
    {
        ActiveSession::removeSession();
        Auth::logout();
        Cookie::forget("ternobo_remembered_session_id");
        Cookie::forget("ternobo_current_page_id");
        return redirect("/");
    }

}
