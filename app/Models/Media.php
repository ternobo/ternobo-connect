<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{

    protected $casts = [
        'meta' => 'array',
    ];

    protected $fillable = [
        'name',
        'filename',
        'access',
        'type',
        'user_id',
        'meta',
    ];
}
