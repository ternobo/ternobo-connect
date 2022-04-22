<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

/**
 * App\Models\Feedback
 *
 * @property mixed description
 * @property mixed title
 * @property int $id
 * @property string $title
 * @property string|null $description
 * @property int $user_id
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \App\Models\FeedbackReply|null $pinnedReply
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\FeedbackReply[] $replies
 * @property-read int|null $replies_count
 * @property-read \App\Models\User $user
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\FeedbackVote[] $votes
 * @property-read int|null $votes_count
 * @method static \Illuminate\Database\Eloquent\Builder|Feedback newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Feedback newQuery()
 * @method static \Illuminate\Database\Query\Builder|Feedback onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Feedback query()
 * @method static \Illuminate\Database\Eloquent\Builder|Feedback whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Feedback whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Feedback whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Feedback whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Feedback whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Feedback whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Feedback whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Feedback whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|Feedback withTrashed()
 * @method static \Illuminate\Database\Query\Builder|Feedback withoutTrashed()
 * @mixin \Eloquent
 */
class Feedback extends Model
{
    use SoftDeletes;

    protected $with = [
        "pinnedReply",
    ];

    protected $table = "feedbacks";
    protected $dates = ['deleted_at'];

    public function replies()
    {
        return $this->hasMany(FeedbackReply::class, "feedback_id")->where("pinned", false)->latest();
    }

    public function pinnedReply()
    {
        return $this->hasOne(FeedbackReply::class, "feedback_id")->with("user")->where("pinned", true);
    }

    public function user()
    {
        return $this->belongsTo("App\Models\User", "user_id");
    }

    public function votes()
    {
        return $this->hasMany(FeedbackVote::class, "feedback_id");
    }

    public function isVoted()
    {
        return FeedbackVote::query()->where("user_id", Auth::user()->id)->where("feedback_id", $this->id)->exists();
    }

    public function isBookmarked()
    {
        return FeedbackBookmark::query()->where("user_id", Auth::user()->id)->where("feedback_id", $this->id)->exists();
    }

    public function toArray()
    {
        $data = parent::toArray();
        // change the value of the 'skills' key
        if (!isset($data['user']) && $this->user) {
            $data['user'] = $this->user;
        }

        if (!isset($data['replies'])) {
            $data['replies'] = $this->replies;
        }

        $data['votes'] = count($this->votes);

        if (Auth::check()) {
            $data['voted'] = $this->isVoted();
            $data['isBookmarked'] = $this->isBookmarked();
        }

        return $data;
    }

}
