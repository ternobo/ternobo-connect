<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\PostSlide
 *
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\PostBlock[] $content
 * @property-read int|null $content_count
 * @property-read \App\Models\Page $page
 * @property-read \App\Models\Post $post
 * @method static \Illuminate\Database\Eloquent\Builder|PostSlide newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PostSlide newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PostSlide query()
 * @mixin \Eloquent
 */
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
        return $this->hasMany(PostBlock::class, "slide_id")->orderBy("sort", "asc");
    }

    public function page()
    {
        return $this->belongsTo(Page::class, "page_id");
    }
}
