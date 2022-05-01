<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * All models are connected to database so just functions are defined and variables variables are dynamic.
 * 
 * Variables :
 *      post_id - bookmarked post id
 *      action - \App\Post bookmarked post
 *      created_at - bookmark date
 *
 * @property int $id
 * @property int|null $post_id
 * @property int|null $article_id
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $deleted_at
 * @property-read \App\Models\Post|null $post
 * @method static \Illuminate\Database\Eloquent\Builder|Bookmark newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Bookmark newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Bookmark query()
 * @method static \Illuminate\Database\Eloquent\Builder|Bookmark whereArticleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Bookmark whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Bookmark whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Bookmark whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Bookmark wherePostId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Bookmark whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Bookmark whereUserId($value)
 * @mixin \Eloquent
 */
class Bookmark extends Model
{

    /**
     * this function is returning relation and it's using it privately to generate $post variable
     *
     * @return type App\Post
     */
    public function post()
    {
        return $this->belongsTo(Post::class, "post_id")->with(["page", 'likes', 'mutualLikes', 'category', 'slides', "slides.content"]);
    }
}
