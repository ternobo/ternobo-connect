<?php

namespace App\Models;

use App\HasUser;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConnectedAccount extends Model
{
    use HasFactory;
    use HasUser;

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

    protected $hidden = [
        'token',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
