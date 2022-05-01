<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\FeedbackVote
 *
 * @property int $id
 * @property int $feedback_id
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|FeedbackVote newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|FeedbackVote newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|FeedbackVote query()
 * @method static \Illuminate\Database\Eloquent\Builder|FeedbackVote whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FeedbackVote whereFeedbackId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FeedbackVote whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FeedbackVote whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FeedbackVote whereUserId($value)
 * @mixin \Eloquent
 */
class FeedbackVote extends Model
{
    public function idea()
    {
        return $this->belongsTo("App\Models\Idea", "idea_id");
    }
}
