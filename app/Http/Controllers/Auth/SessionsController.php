<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\ActiveSession;
use Illuminate\Support\Facades\Auth;

class SessionsController extends Controller
{
    public function getSessions()
    {
        $user = Auth::user();
        $sessions = ActiveSession::query()->where("user_id", $user->id)->get();
        return response()->json([
            'result' => true,
            'sessions' => $sessions,
        ]);
    }

    public function delete($id)
    {
        $user = Auth::user();
        $session = ActiveSession::query()->where("user_id", $user->id)->where('id', $id)->first();
        if ($session instanceof ActiveSession) {
            $session->delete();
            return response()->json(['result' => true]);
        }

        return response()->json(['result' => false]);
    }
}
