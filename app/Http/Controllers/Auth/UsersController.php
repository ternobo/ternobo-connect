<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Mail;
use App\Models\Page;
use App\SMS;
use App\Models\User;
use App\Models\Verification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;
use PersianValidator\NationalCode\NationalCode;

class UsersController extends Controller
{

    public function sendVcode(Request $request)
    {
        $messages = [
            "phone.unique" => __("شماره همراه تکراری است!"),
            "email.unique" => __("ایمیل تکراری است"),
            "email" => _("ایمیل نامعتبر است")
        ];
        $validator = Validator::make($request->all(), [
            'phone' => 'unique:users,phone',
            'email' => 'email:rfc|unique:users,email',
        ], $messages);
        if ($validator->fails()) {
            return response()->json(array("result" => false, "errors" => $validator->errors()));
        }
        session()->remove("phone");
        session()->remove("email");

        if ($request->has("phone")) {
            $sms = new SMS($request->phone);
            $code = random_int(111111, 999999);
            $verification = new Verification();
            $verification->code = $code;
            $verification->phone = $request->phone;
            $verification->save();
            session()->put("phone", $request->phone);
            return response()->json(array("result" => $sms->sendUltraFastSMS(array(SMS::makeParameter("VerificationCode", $code)), "23109")));
        } elseif ($request->has("email")) {
            $code = random_int(111111, 999999);
            $verification = new Verification();
            $verification->code = $code;
            $verification->phone = $request->email;
            $verification->save();
            session()->put("email", $request->email);
            $html = view('emails.verification', array("vcode" => $code))->render();
            $text = "کد فعالسازی شما در ترنوبو : $code";
            $title = "کد فعالسازی ترنوبو";
            $mail = new Mail();
            $mail->addAddress($request->email);
            $mail->send($title, $text, $html);
            session()->put("email", $request->email);
            return response()->json(array("result" => true));
        } else {
            return response()->json(array("result" => false, "msg" => __("شماره همراه یا ایمیل اجباری است.")));
        }
    }

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

    public function verifyCode(Request $request)
    {
        if ($request->has("code")) {
            $phone = "";
            if (session()->has("phone")) {
                $phone = session()->get("phone");
            } elseif (session()->has("email")) {
                $phone = session()->get("email");
            }
                
            $verification = Verification::query()->where("code", $request->code)->where("phone", $phone)->first();
            if ($verification instanceof Verification) {
                return response()->json(array("result" => true));
            } else {
                return response()->json(array("result" => false, "msg" => __("کد فعال سازی نامعتبر است!")));
            }
        }
        return abort(400);
    }

    public function signupUser(Request $request)
    {
        $messages = [
            'required' => __('این فیلد اجباری است'),
            "unique" => __("نام کاربری تکراری است"),
            "username.regex" => _("نام کاربری نامعتبر است. فقط حروف انگلیسی و بدون فاصله وارد کنید")
        ];

        $validator = Validator::make($request->all(), [
            "firstname" => "required",
            "lastname" => "required",
            'username' => 'required|min:3|unique:users,username|regex:/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/',
            "gender" => "required"
        ], $messages);
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
                                $invalid[] = Str::substr($route->uri, $pos+1);
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
            $user->name = $request->firstname . " " . $request->lastname;
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
                $user->profile = url("/img/man-profile.png");
            } else {
                $user->profile = url("/img/woman-profile.png");
            }
            $user->generateToken();


            $page = new Page();
            $page->name = $user->name;
            $page->profile = $user->profile;
            $page->cover = $user->cover;
            $page->slug = $user->username;
            $page->short_bio = "";
            $page->type = "personal";

            session()->put("passwd", "toSet");
            session()->put("theUser", array("user" => $user, "page" => $page));
            return response()->json(array("result" => true));
        }
    }

    public function savePassword(Request $request)
    {
        if (session()->has("passwd")) {
            $user = session()->get("theUser")['user'];
            $user->password = Hash::make($request->password);
            $user->save();

            $page = session()->get("theUser")['page'];
            $page->user_id = $user->id;
            $page->save();

            Auth::login($user, true);
            return response()->json(array("result" => true));
        }
        return abort(400);
    }

    public function setProfile(Request $request)
    {
        if ($request->has("profile")) {
            if (Auth::check()) {
                $file = ($request->file("profile")->store("profiles"));
                //   dd(Storage::disk('local')->getAdapter()->getPathPrefix() . $file);
                $image = Image::make(Storage::disk('local')->getAdapter()->getPathPrefix() . $file);
                if ($request->has("sizes")) {
                    $sizes = (json_decode($request->sizes));
                    $image = $image->crop(intval($sizes->width), intval($sizes->height), intval($sizes->x), intval($sizes->y));
                    $image->save();
                }
                $user = $request->user();
                $page = $user->getPage();
                $user->profile = url($file);
                $page->profile = url($file);
                $user->save();
                $page->save();
                if ($request->has("json")) {
                    return response()->json(array("result" => true));
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
        if ($request->has("cover")) {
            if (Auth::check()) {
                $file = $request->file("cover")->store("profiles");
                //      dd(Storage::disk('local')->getAdapter()->getPathPrefix() . $file);
                $image = Image::make(Storage::disk('local')->getAdapter()->getPathPrefix() . $file);
                if ($request->has("sizes")) {
                    $sizes = (json_decode($request->sizes));
                    $image = $image->crop(intval($sizes->width), intval($sizes->height), intval($sizes->x), intval($sizes->y));
                }
                $image->save(null, 90, "jpg");
                $user = $request->user();
                $page = $user->getPage();
                $user->cover = url($file);
                $page->cover = url($file);
                $user->save();
                $page->save();
                if ($request->has("json")) {
                    return response()->json(array("result" => true));
                }
                return redirect("/home");
            } else {
                return abort(404);
            }
        } else {
            return redirect("/home");
        }
    }

    public function verificationRequest(Request $request)
    {
        $messages = [
            "nationalcode.required" => "کد ملی اجباری است.",
            "file.mimes" => "فایل انتخابی نامعتبر است!",
            "file.max" => "حداکثر حجم فایل 1 مگابایت است.",
            "file.required" => "عکس سلفی با کارت ملی الزامی است"
        ];
        $validator = Validator::make($request->all(), [
            "file" => "required|mimes:jpg,jpeg,png|max:1024",
            "nationalcode" => "required"
        ], $messages);
        if ($validator->fails()) {
            return response()->json(array("result" => false, "errors" => $validator->errors()));
        } else {
            $nationalcode = NationalCode::make($request->nationalcode);
            if ($nationalcode->notValid()) {
                return response()->json(array("result" => false, "errors" => array("کدملی نامعتبر است")));
            }
            $user = Auth::user();
            $user->nationalcard = url($request->file("file")->store("nationalcards"));
            $user->nationalcode = $request->nationalcode;
            return response()->json(array("result" => $user->save()));
        }
    }

    public function settingsPage(Request $request)
    {
        return view("settings");
    }

    public function changePassword(Request $request)
    {
        $messages = [
            "password" => "رمزعبور فعلی نامعتبر است"
        ];
        $validator = Validator::make($request->all(), [
            'currentpassword' => 'password',
            "password" => "required"
        ], $messages);
        if ($validator->fails()) {
            return response()->json(array("result" => false, "errors" => $validator->errors()));
        } else {
            $user = Auth::user();
            if (Hash::check($request->currentpassword, $user->password)) {
                $user->password = Hash::make($request->password);
                Auth::logout();
                return response()->json(array("result" => true));
            }
            return response()->json(array("result" => false, "errors" => array("رمزعبور فعلی نامعتبر است")));
        }
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
            //   echo session()->get("email");
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

    public function deactiveAccount(Request $request)
    {
        $messages = [
            "password.password" => "رمز عبور نامعتبر است"
        ];
        $validator = Validator::make($request->all(), [
            "password" => "password"
        ]);
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