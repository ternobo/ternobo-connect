<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\NewUserRequest;
use App\Models\User;
use App\Rules\UsernameValidator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $users = User::withTrashed()
            ->withCount(["followings", 'followers']);

        if ($request->filled("q")) {
            $query = $request->q;
            $users = $users->whereRaw("name like ?", ["%$query%"])
                ->orWhereRaw("username like ?", ["$query%"])
                ->orWhereRaw("phone like ?", ["%$query%"]);
        }

        $data = $users->paginate();
        if ($request->filled("q")) {
            $data->appends('q', $request->q);
        }

        foreach ($data as $user) {
            $user->makeVisible([
                "deleted_at",
                "two_factor_type",
                "two_factor_recovery_codes",
                "two_factor_secret",
                "two_factor_enabled",
                "two_factor",
                "pushe_id",
                "token",
                "phone",
                "email",
                "created_at",
                "updated_at",
            ]);
        }
        return response()->json(['result' => true, 'data' => $data]);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\User $user
     * @return \Illuminate\Http\Response
     */
    public function show($user)
    {
        $user = User::withTrashed()->where("id", $user)->with(['personalPage'])->firstOrFail();
        $user->makeVisible([
            "deleted_at",
            "two_factor_type",
            "two_factor_recovery_codes",
            "two_factor_secret",
            "two_factor_enabled",
            "two_factor",
            "pushe_id",
            "token",
            "phone",
            "email",
            "created_at",
            "updated_at",
        ]);
        $user->loadCount(["followings", 'followers']);
        $user->load(["personalPage.aboutData", "personalPage.contactData", "invitedBy"]);
        return response()->json(['result' => true, 'data' => $user]);
    }

    public function store(NewUserRequest $request)
    {
        $user = new User($request->all());
        $user->password = Hash::make($request->password);
        $user->generateToken();
        $user->save();
        $user->makePage()->save();
        return response()->json(['result' => true, "user" => $user]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\User $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $user)
    {
        $user = User::withTrashed()->where("id", $user)->firstOrFail();
        $validator = Validator::make($request->all(), [
            "email" => [Rule::unique("users", "email")->ignore($user->id), "email"],
            "username" => [new UsernameValidator($user->personalPage->id)],
            "phone" => [Rule::unique("users", "phone")->ignore($user->id)],
        ], [
            'email.unique' => "ایمیل تکراری است",
            'phone.unique' => "شماره تماس تکراری است",
            'email.email' => "ایمیل نامعتبر است",
        ]);
        if ($validator->fails()) {
            return response()->json(['result' => false, "errors" => $validator->errors()]);
        }

        $fields = $request->all();
        $result = $user->update($request->all());
        if ($request->filled("password")) {
            $user->password = Hash::make($request->password);
            $result = $user->save();
        }

        return response()->json(['result' => $result]);
    }

    public function verifyUser(User $user)
    {
        if ($user->nationalcard !== null) {
            $user->is_verified = true;
            return response()->json(["result" => $user->save()]);
        }
    }

    /**
     * Deacive Multiple resource from storage.
     *
     * @param \App\User $user
     * @return \Illuminate\Http\Response
     */
    public function activeMultiple(Request $request)
    {
        try {
            $request->validate(['users' => ["required", 'array']]);
            $users = $request->users;
            $result = User::query()->whereIn("id", $users)->restore();

            return response()->json(['result' => $result != 0 && $result != null]);
        } catch (\Exception $e) {
            return response()->json(['result' => false]);
        }
    }

    /**
     * Deacive Multiple resource from storage.
     *
     * @param \App\User $user
     * @return \Illuminate\Http\Response
     */
    public function deactiveMutiple(Request $request)
    {
        try {
            $request->validate(['users' => ["required", 'array']]);
            $users = $request->users;
            $result = User::query()->whereIn("id", $users)->delete();
            return response()->json(['result' => $result != 0 && $result != null]);
        } catch (\Exception $e) {
            return response()->json(['result' => false]);
        }
    }

    public function forceDestory(Request $request)
    {
        try {
            $request->validate(['users' => ["required", 'array']]);
            $users = $request->users;
            $result = User::query()->whereIn("id", $users)->forceDelete();
            return response()->json(['result' => $result != 0 && $result != null]);
        } catch (\Exception $e) {
            return response()->json(['result' => false]);
        }
    }
}
