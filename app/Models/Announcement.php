<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    use HasFactory;

    protected $casts = [
        "has_confetti" => "boolean",
    ];

    protected $fillable = [
        "title",
        "text",
        "icon",
        "user_id",
        "has_confetti"
    ];
}
