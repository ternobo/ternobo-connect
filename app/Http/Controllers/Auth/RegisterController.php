<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Middleware\InviteLinkMiddleware;
use App\Models\ActiveSession;
use App\Models\InviteLink;
use App\Models\Otp;
use App\Models\User;
use App\Rules\UsernameValidator;
use Artesaos\SEOTools\Facades\SEOTools;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Ternobo\TernoboWire\TernoboWire;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
     */

    // use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */

    public function index(Request $request)
    {
        if ($request->filled("code")) {
            $code = $request->code;
            session()->put("invite_code", $code);
            $invite = InviteLink::query()->with(['user'])->where("code", $code)->whereNull('used_by')->where("valid", "1")->firstOrFail();
            SEOTools::setDescription(__("register.welcome"));
            return TernoboWire::render("Register", ['user' => $invite->user]);
        }
        return TernoboWire::render("Register");
    }

    public function signupUser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "firstname" => ["required"],
            "lastname" => ["required"],
            'username' => ['required', "min:3", new UsernameValidator()],
            "gender" => ["required", Rule::in(["1", "2"])],
            "verificationToken" => ['required', 'exists:otps,verification_token']
        ], [], ['gender' => __("validation.attributes.sex")]);

        if ($validator->fails()) {
            return response()->json(array("result" => false, "errors" => $validator->errors()));
        } else {
            DB::beginTransaction();
            try {
                $user = new User();
                $user->first_name = $request->firstname;
                $user->last_name = $request->lastname;

                $otp = Otp::query()->where("verification_token", $request->verificationToken)->where("is_verified", true)->first();
                $user->phone = $otp->identifier;

                $user->username = strtolower($request->username);
                $user->phone_verified_at = time();
                $user->gender = $request->gender;
                $user->cover = url("/img/cover.jpg");
                $user->short_bio = "";
                if ("$user->gender" === "1") {
                    $user->profile = url("/img/woman-profile.png");
                } else {
                    $user->profile = url("/img/man-profile.png");
                }
                $user->generateToken();
                $otp->delete();

                session()->put("passwd", "toSet");
                session()->put("theUser", array("user" => $user));
                DB::commit();
                return response()->json(["result" => true]);
            } catch (\Throwable $th) {
                DB::rollBack();
                throw $th;
            }
        }
    }

    public function savePassword(Request $request)
    {
        if (session()->has("passwd")) {
            $user = session()->get("theUser")['user'];
            $user->password = Hash::make($request->password);
            $user->save();

            $invite = InviteLink::query()->where("code", session("invite_code"))->first();

            ActiveSession::addSession($user->id);
            Auth::login($user, true);
            $page = $user->makePage();

            if ($invite instanceof InviteLink) {
                $user->invited_by = $invite->user_id;
                $user->save();
                InviteLink::createLink($user->id);
                InviteLink::createLink($user->id);
                $invite->valid = false;
                $invite->used_by = $user->id;
                $invite->save();
            } else {
                $page->visible = false;
            }
            $page->save();



            return response()->json(["result" => true]);
        }
        return abort(400);
    }
}
