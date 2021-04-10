<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostContent extends Model
{
    use HasFactory;

    protected $fillable = [
        "page_id",
        "slide_id",
        "content",
        "type",
        "sort",
    ];
}
