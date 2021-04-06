<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::withTrashed()
            ->withCount(["followings", 'followers'])
            ->paginate();

        foreach ($users as $user) {
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

        return response()->json(['result' => true, 'data' => $users]);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\User $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
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
        return response()->json(['result' => true, 'data' => $user]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\User $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
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
            $users = $request->users;
            $result = User::query()->whereIn("id", $users)->forceDelete();

            return response()->json(['result' => $result != 0 && $result != null]);
        } catch (\Exception $e) {
            return response()->json(['result' => false]);
        }
    }

}
