<?php

namespace App\Http\Controllers\Admin;

use App\Models\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

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
            ->with("personalPage")
            ->get();
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

        $notAllowed = [
            "id",
            "name",
            "2AF",
            "email_verified_at",
            "deleted_at",
            "created_at",
            "password"
        ];
        $fields = $request->all();
        if (count($fields) > 0) foreach ($fields as $key => $value) {
            if (!in_array($key, $notAllowed)) {
                $user->setAttribute($key, $value);
                if ($key === "first_name" || $key === "last_name") {
                    $user->name = $user->first_name . " " . $user->last_name;
                }
            }
        }
        return response()->json(['result' => $user->save()]);
    }

    public function verifyUser(User $user){
       if($user->nationalcard !== null){
           $user->is_verified = true;
           return response()->json(["result"=>$user->save()]);
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
