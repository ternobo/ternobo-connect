<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Middleware\InviteLinkMiddleware;
use App\Http\Requests\CreateUserRequest;
use App\Models\ActiveSession;
use App\Models\InviteLink;
use App\Models\Otp;
use App\Models\User;
use App\Rules\UsernameValidator;
use App\Utils\Uploader;
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

    public function createUser(CreateUserRequest $request)
    {
        $user = User::create(
            array_merge(
                $request->only(['firstname', 'lastname', "nickname", "username", "gender"]),
                [
                    "password" => Hash::make($request->password),
                    "profile" => Uploader::uplaodProfile($request->profile, $request->sizes)
                ]
            )
        );

        ActiveSession::addSession($user->id);
        $page = $user->makePage();

        $invite = InviteLink::query()->where("code", session("invite_code"))->first();

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


        Auth::login($user, true);

        return $this->generateResponse(true, $user);
    }
}
