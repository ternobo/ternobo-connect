<?php

namespace App\Models;

use App\Casts\SlideBlockContentCast;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SlideBlock extends Model
{
    use HasFactory;

    protected $casts = [
        "meta" => "array",
        "content" => SlideBlockContentCast::class,
    ];

    protected $fillable = [
        "page_id",
        "slide_id",
        "content",
        "type",
        "sort",
        "meta"
    ];
}
