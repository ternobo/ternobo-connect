<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostSlide extends Model
{

    protected $fillable = [
        'page_id',
        'post_id',
    ];

    use HasFactory;

    public function post()
    {
        return $this->belongsTo(Post::class, "post_id");
    }

    public function content()
    {
        return $this->hasMany(SlideBlock::class, "slide_id")->orderBy("sort", "asc");
    }

    public function page()
    {
        return $this->belongsTo(Page::class, "page_id");
    }
}
