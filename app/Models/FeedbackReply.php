<?php

namespace App\Models;

use App\HasUser;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;

/**
 * App\Models\FeedbackReply
 *
 * @property int $id
 * @property int $user_id
 * @property int $feedback_id
 * @property string $text
 * @property int|null $parent_id
 * @property int|null $reply_to
 * @property int $pinned
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Feedback $feedback
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Like[] $likes
 * @property-read int|null $likes_count
 * @property-read \Illuminate\Database\Eloquent\Collection|FeedbackReply[] $replies
 * @property-read int|null $replies_count
 * @property-read FeedbackReply|null $replyto
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|FeedbackReply newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|FeedbackReply newQuery()
 * @method static \Illuminate\Database\Query\Builder|FeedbackReply onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|FeedbackReply query()
 * @method static \Illuminate\Database\Eloquent\Builder|FeedbackReply whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FeedbackReply whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FeedbackReply whereFeedbackId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FeedbackReply whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FeedbackReply whereParentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FeedbackReply wherePinned($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FeedbackReply whereReplyTo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FeedbackReply whereText($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FeedbackReply whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FeedbackReply whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|FeedbackReply withTrashed()
 * @method static \Illuminate\Database\Query\Builder|FeedbackReply withoutTrashed()
 * @mixin \Eloquent
 */
class FeedbackReply extends Model
{
    use SoftDeletes;
    use HasUser;

    protected $dates = ['deleted_at'];

    protected $fillable = ['pinned'];

    public function feedback()
    {
        return $this->belongsTo("App\Models\Feedback", "feedback_id");
    }

    public function user()
    {
        return $this->belongsTo("App\Models\User", "user_id");
    }

    public function likes()
    {
        return $this->hasMany("App\Models\Like", "feedback_reply");
    }

    public function replyto()
    {
        return $this->belongsTo("App\Models\FeedbackReply", "reply_to");
    }

    public function replies()
    {
        return $this->hasMany(FeedbackReply::class, "parent_id");
    }

    /**
     * Get liked by Text
     * @return string
     */
    public function mutualLikes()
    {
        return $this->hasMany("App\Models\Like", "comment_id")
            ->with("page")
            ->whereHas("page", function ($query) {
                $query->whereRaw("id in (select following from followings where page_id = ?)", Auth::user()->id);
            })
            ->latest();
    }

/**
 * Get liked by Text
 * @return string
 */
    public function getLikedBy()
    {
        $myConnection = Like::query()
            ->join("pages", "likes.page_id", "=", "pages.id")
            ->where("likes.comment_id", $this->id)
            ->whereIn("pages.user_id", Auth::user()->getConnections())
            ->latest()
            ->limit(2)
            ->select(array("pages.name", "pages.user_id", "pages.slug", "likes.*"))
            ->distinct("page_id")
            ->get();
        $users = array();
        $ids = array();
        $response = "";
        if (count($myConnection) > 0) {
            foreach ($myConnection as $like) {
                if (!in_array($like->slug, $ids)) {
                    $ids[] = $like->slug;
                    $user = new \stdClass();
                    $user->id = $like->user_id;
                    $user->name = $like->name;
                    $user->slug = $like->slug;
                    $users[] = $user;
                }
            }
            $response = "";
        }

        $all = count($users);
        $index = 0;
        foreach ($users as $user) {
            $response .= "<a href='$user->slug' class='text-dark bold'>$user->name</a>";
            if ($index + 1 < $all) {
                $response .= "، ";
            }
        }
        if (count($myConnection) > 2) {
            $response .= "و ...";
        }
        return $response;
    }

    public function toArray()
    {
        // get the original array to be displayed
        $data = parent::toArray();
        $data['is_liked'] = false;
        if (Auth::check()) {
            if ($this->likes != null) {
                $data['liked_by'] = $this->getLikedBy();
                $current_page = json_decode(Cookie::get('ternobo_current_page')) !== null ? json_decode(Cookie::get('ternobo_current_page')) : Auth::user()->personalPage;
                $page_ids = array_column($this->likes->toArray(), "page_id");
                if (in_array($current_page->id, $page_ids)) {
                    $data['is_liked'] = true;
                }
            }
        }
        return $data;
    }
}
