<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Admin extends Authenticatable
{
    protected $roles = [
        "Admin",
        "UsersManager",
        "HelpCenterManger",
        "ContentManger"
    ];

    use Notifiable;


    use SoftDeletes;

    protected $dates = ['deleted_at'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', "api_token", "created_at", "updated_at", "token", "phone_verified_at", "followings", "nationalcode", "nationalcard", "pushe_id"
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function generateApiKey()
    {
        $api_key = "";
        do {
            $api_key = $this->getAPI_key();
        } while (User::where("api_token", $api_key)->first() instanceof User);
        $this->api_token = $api_key;
        return $api_key;
    }

    private function getAPI_key()
    {
        $length = 32;
        $token = "";
        $codeAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        $codeAlphabet .= "0123456789";

        for ($i = 0; $i < $length; $i++) {
            $token .= $codeAlphabet[mt_rand(0, strlen($codeAlphabet) - 1)];
        }
        return $token;
    }
}
