<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

/**
 * @property mixed description
 * @property mixed title
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
