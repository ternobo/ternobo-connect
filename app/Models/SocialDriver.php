<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SocialDriver extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'icon',
        'driver',
        "active",
        "link"
    ];

    protected $hidden = [
        'token',
    ];

    public function account()
    {
        return $this->hasOne(ConnectedAccount::class, "driver", "driver")->latest();
    }
}
