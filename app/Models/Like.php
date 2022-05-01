<?php

namespace App\Models;

use App\HasPage;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Like
 *
 * @property int $id
 * @property int $page_id
 * @property int|null $post_id
 * @property int|null $comment_id
 * @property string|null $feedback_reply
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Notification|null $notification
 * @property-read \App\Models\Page $page
 * @property-read \App\Models\Post|null $post
 * @method static \Illuminate\Database\Eloquent\Builder|Like newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Like newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Like query()
 * @method static \Illuminate\Database\Eloquent\Builder|Like whereCommentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Like whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Like whereFeedbackReply($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Like whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Like wherePageId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Like wherePostId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Like whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Like extends Model
{
    use HasPage;

    /**
     * Page that like the post
     * @var \App\Page
     */
    public function page()
    {
        return $this->belongsTo(Page::class);
    }

    public function post()
    {
        return $this->belongsTo(Post::class);
    }



    public function notification()
    {
        return $this->hasOne(Notification::class, "connected_to")->where("action", "like");
    }

    public function delete()
    {
        $this->notification()->delete();
        return parent::delete();
    }
}
