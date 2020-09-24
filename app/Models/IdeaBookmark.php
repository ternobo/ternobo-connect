<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property mixed user_id
 * @property \Illuminate\Database\Eloquent\HigherOrderBuilderProxy|\Illuminate\Support\HigherOrderCollectionProxy|mixed idea_id
 */
class IdeaBookmark extends Model
{
    public function idea(){
       return $this->belongsTo("App\Models\Idea","idea_id");
    }
}