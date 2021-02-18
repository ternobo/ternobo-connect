<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    protected $fillable = [
        'name',
        'filename',
        'access',
        'type',
        'user_id',
        'meta',
    ];
}
