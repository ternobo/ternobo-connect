<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Request;
use Jenssegers\Agent\Agent;
use Stevebauman\Location\Facades\Location;

class ActiveSession extends Model
{
    use HasFactory;
    use SoftDeletes;

    public static function getActiveSessions()
    {
        if (Auth::check()) {
            $sessions = ActiveSession::query()->where("user_id", Auth::user()->id)->get();
            return $sessions;
        }
        return [];
    }

    public static function addSession($user_id)
    {
        $session = new ActiveSession();
        $agent = new Agent();
        $agent->setUserAgent(Request::userAgent());

        $session->user_agent = json_encode([
            "device" => $agent->device(),
            'platform' => $agent->platform(),
            'browser' => $agent->browser(),
            "isMobile" => $agent->isMobile(),
        ]);
        $session->user_id = $user_id;

        $session->ip_address = Request::ip();
        $location = Location::get(Request::ip());
        if ($location) {
            $session->location = Location::get(Request::ip())->countryName;
        }
        $session->save();
        Cookie::queue('ternobo_remembered_session_id', $session->id, 1.577e+9);
    }

    public function toArray()
    {
        $data = parent::toArray();
        $data['user_agent'] = json_decode($data['user_agent']);

        $cookie = Cookie::get('ternobo_remembered_session_id');

        $data['isActive'] = $cookie == $data['id'];

        return $data;
    }

    public static function removeSession()
    {
        if (Auth::check()) {
            $cookie = Cookie::get('ternobo_remembered_session_id');
            if ($cookie != null) {
                $session = ActiveSession::query()->where("id", $cookie)->first();
                $session->delete();
            }
            return false;
        }

    }

    public static function getCurrentSession()
    {
        if (Auth::check()) {
            // dd(Request::userAgent());
            $cookie = Cookie::get('ternobo_remembered_session_id');
            if ($cookie != null) {
                $session = ActiveSession::query()->where("id", $cookie)->first();
                if ($session != null) {
                    return $session;
                }
            }
            return null;
        }

    }

    public static function checkSession()
    {
        if (Auth::check()) {
            // dd(Request::userAgent());
            $cookie = Cookie::get('ternobo_remembered_session_id');
            if ($cookie != null) {
                $session = ActiveSession::query()->where("id", $cookie)->first();
                if ($session != null) {
                    $session->touch();
                    $session->ip_address = Request::ip();
                    $location = Location::get(Request::ip());
                    if (is_object($location)) {
                        $session->location = $location->countryName;
                    }
                    $session->save();
                    return true;
                }
            }
            return false;
        }
        return false;

    }

}
