<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property mixed user_id
 * @property \Illuminate\Database\Eloquent\HigherOrderBuilderProxy|\Illuminate\Support\HigherOrderCollectionProxy|mixed feedback_id
 */
class FeedbackBookmark extends Model
{
    public function feedback()
    {
        return $this->belongsTo("App\Models\Feedback", "feedback_id");
    }
}
