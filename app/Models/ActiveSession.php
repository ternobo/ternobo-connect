<?php

namespace App\Models;

use App\HasUser;
use App\Ternobo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Str;
use Jenssegers\Agent\Agent;
use Stevebauman\Location\Facades\Location;

/**
 * App\Models\ActiveSession
 *
 * @property int $id
 * @property int|null $user_id
 * @property string|null $token
 * @property string|null $ip_address
 * @property string|null $user_agent
 * @property string|null $location
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User|null $user
 * @method static \Illuminate\Database\Eloquent\Builder|ActiveSession newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ActiveSession newQuery()
 * @method static \Illuminate\Database\Query\Builder|ActiveSession onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|ActiveSession query()
 * @method static \Illuminate\Database\Eloquent\Builder|ActiveSession whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ActiveSession whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ActiveSession whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ActiveSession whereIpAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ActiveSession whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ActiveSession whereToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ActiveSession whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ActiveSession whereUserAgent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ActiveSession whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|ActiveSession withTrashed()
 * @method static \Illuminate\Database\Query\Builder|ActiveSession withoutTrashed()
 * @mixin \Eloquent
 */
class ActiveSession extends Model
{
    use HasFactory;
    use SoftDeletes;
    use HasUser;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public static function getActiveSessions()
    {
        if (Ternobo::isUserLogedIn()) {
            $sessions = ActiveSession::query()->where("user_id", Auth::user()->id)->get();
            return $sessions;
        }
        return [];
    }

    public static function getActiveSessionsCount()
    {
        if (Ternobo::isUserLogedIn()) {
            $sessions = ActiveSession::query()->where("user_id", Auth::user()->id)->count();
            return $sessions;
        }
        return 0;
    }

    public static function isAdmin()
    {
        $api_key = Request::header("api-key");
        if ($api_key != null) {
            $session = ActiveSession::query()->where("token", $api_key)->first();
            return $session instanceof ActiveSession;
        }
        return false;
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

        $token = null;
        do {
            $token = Str::uuid();
        } while (ActiveSession::query()->where("token", $token)->first() instanceof ActiveSession);

        $session->token = $token;

        $session->ip_address = Request::ip();
        $location = Location::get(Request::ip());
        if ($location) {
            $session->location = Location::get(Request::ip())->countryName;
        }

        $session->save();
        cookie()->queue(cookie()->forever('ternobo_remembered_session_id', $session->id));
        return $session;
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
        if (Ternobo::isUserLogedIn()) {
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
        if (Ternobo::isUserLogedIn()) {
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
        if (Ternobo::isUserLogedIn()) {
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
