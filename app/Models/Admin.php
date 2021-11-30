<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Passport\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class Admin extends Authenticatable
{
    protected $roles = [
        "Admin",
        "UsersManager",
        "HelpCenterManger",
        "ContentManger"
    ];

    use Notifiable;
    use HasRoles;
    use HasApiTokens;
    use SoftDeletes;

    protected $dates = ['deleted_at'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username',
        'name',
        'phone_number',
        "national_code",
        'email',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password'
    ];
}
