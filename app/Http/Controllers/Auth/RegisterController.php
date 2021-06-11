<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Middleware\InviteLinkMiddleware;
use App\Models\ActiveSession;
use App\Models\InviteLink;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
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

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('throttle:20,1');
        $this->middleware(InviteLinkMiddleware::class);
    }

    public function index(Request $request)
    {
        $code = $request->code;
        session()->put("invite_code", $code);
        $invite = InviteLink::query()->with(['user'])->where("code", $code)->whereNull('used_by')->where("valid", "1")->firstOrFail();
        return TernoboWire::render("Register", ['user' => $invite->user]);
    }

    public function signupUser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "firstname" => "required",
            "lastname" => "required",
            'username' => 'required|min:3|unique:users,username|regex:/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/',
            "gender" => "required",
        ], [], ['gender' => __("validation.attributes.sex")]);
        if ($validator->fails()) {
            return response()->json(array("result" => false, "errors" => $validator->errors()));
        } else {
            if (User::query()->where("username", strtolower($request->username))->first() instanceof User) {
                return response()->json(array("result" => false, "errors" => array("username" => "نام کاربری تکراری است")));
            }
            $invalid = array("help", "admin", "ternobo", "changelog", "feedback", "dashboard", "report", "sitemap", "sitemap.xml", "");

            $route_name = Route::getRoutes()->get();
            foreach ($route_name as $route) {
                if (in_array("GET", $route->methods)) {
                    if (!Str::containsAll($route->uri, ["{page}"])) {
                        if ($route->uri !== "/") {
                            $pos = strpos($route->uri, "/");
                            if ($pos !== false) {
                                $invalid[] = Str::substr($route->uri, $pos + 1);
                            }
                            $invalid[] = $route->uri;
                        }
                    }
                }
            }

            if (in_array(strtolower($request->username), $invalid)) {
                return response()->json(array("result" => false, "errors" => array("username" => "نام کاربری نامعتبر است")));
            }
            $user = new User();
            $user->first_name = $request->firstname;
            $user->last_name = $request->lastname;
            if (session()->has("phone")) {
                $user->phone = session()->get("phone");
            } elseif (session()->has("email")) {
                $user->email = session()->get("email");
            }
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

            session()->put("passwd", "toSet");
            session()->put("theUser", array("user" => $user));
            return response()->json(array("result" => true));
        }
    }

    public function savePassword(Request $request)
    {
        if (session()->has("passwd")) {
            $user = session()->get("theUser")['user'];
            $user->password = Hash::make($request->password);
            $invite = InviteLink::query()->where("code", session("invite_code"))->first();
            $user->invited_by = $invite->user_id;
            $user->save();

            InviteLink::createLink($user->id);
            InviteLink::createLink($user->id);

            $page = $user->makePage()->save();

            ActiveSession::addSession($user->id);
            Auth::login($user, true);

            $invite->valid = false;
            $invite->used_by = $user->id;
            $invite->save();
            return response()->json(array("result" => true));
        }
        return abort(400);
    }

}
