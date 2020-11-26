<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\ActiveSession;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
     */

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    public function login(Request $request)
    {
        $user = User::where("username", strtolower($request->username))->orWhere("email", strtolower($request->username))->orWhere("phone", strtolower($request->username))->first();
        if ($user !== null) {

            if (!Hash::check($request->password, $user->password)) {
                $exception = ValidationException::withMessages([
                    "password" => [trans('رمزعبور اشتباه است.')],
                ]);
                return response()->json(["result" => false, "errors" => $exception->errors()]);
            }
            Auth::login($user, true);
            ActiveSession::addSession($user->id);
            $user->active = true;
            $user->save();

            return response()->json(["result" => true])->cookie("ternobo_current_page", $user->personalPage, 9999999);
        }
        $exception = ValidationException::withMessages([
            "email" => [trans('نام‌کاربری، ایمیل یا شماره همراه اشتباه است.')],
        ]);
        return response()->json(["result" => false, "errors" => $exception->errors()]);
    }

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

}
