<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IdeaVote extends Model
{
    public function idea()
    {
        return $this->belongsTo("App\Models\Idea", "idea_id");
    }
}
