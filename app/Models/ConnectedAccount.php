<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConnectedAccount extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'driver',
        'expiresIn',
        'token',
        'user_id',
        'meta',
    ];

    protected $casts = [
        'meta' => 'array',
    ];
}
