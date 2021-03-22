<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PostSlide extends Model
{

    protected $fillable = [
        'page_id',
        'post_id',
    ];

    use HasFactory;
    use SoftDeletes;

    public function post()
    {
        return $this->belongsTo(Post::class, "post_id");
    }

    public function page()
    {
        return $this->belongsTo(Page::class, "page_id");
    }

}
