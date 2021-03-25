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
        $user = User::withTrashed()
            ->withCount(["followings", 'followers'])
            ->paginate()
            ->makeVisible(["deleted_at", "two_factor", "pushe_id", "token"]);

        return response()->json(['result' => true, 'data' => $user]);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\User $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
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
     * Remove the specified resource from storage.
     *
     * @param \App\User $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        try {
            return response()->json(['result' => $user->delete() && $user->pages()->delete()]);
        } catch (\Exception $e) {
            return response()->json(['result' => false]);
        }
    }
}
