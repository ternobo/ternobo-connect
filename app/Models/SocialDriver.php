<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class SocialDriver extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'icon',
        'driver',
        "active",
    ];

    protected $hidden = [
        'token',
    ];

    public function account()
    {
        return $this->hasOne(ConnectedAccount::class, "driver", "driver")->where("user_id", Auth::check() ? Auth::user()->id : '-1')->latest();
    }
}
