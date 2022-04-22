<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\FeedbackBookmark
 *
 * @property mixed user_id
 * @property \Illuminate\Database\Eloquent\HigherOrderBuilderProxy|\Illuminate\Support\HigherOrderCollectionProxy|mixed feedback_id
 * @property int $id
 * @property int $feedback_id
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Feedback|null $feedback
 * @method static \Illuminate\Database\Eloquent\Builder|FeedbackBookmark newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|FeedbackBookmark newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|FeedbackBookmark query()
 * @method static \Illuminate\Database\Eloquent\Builder|FeedbackBookmark whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FeedbackBookmark whereFeedbackId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FeedbackBookmark whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FeedbackBookmark whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FeedbackBookmark whereUserId($value)
 * @mixin \Eloquent
 */
class FeedbackBookmark extends Model
{
    public function feedback()
    {
        return $this->belongsTo("App\Models\Feedback", "feedback_id");
    }
}
