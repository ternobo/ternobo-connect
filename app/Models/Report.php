<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Report extends Model
{

    use SoftDeletes;

    protected $fillable = [
        'status',
        'admin_note',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, "user_id");
    }

    public function post()
    {
        return $this->belongsTo(Post::class, "post_id");
    }

    public function comment()
    {
        return $this->belongsTo(Comment::class, "comment_id");
    }

    public function page()
    {
        return $this->belongsTo(Page::class, "page_id");
    }

}
