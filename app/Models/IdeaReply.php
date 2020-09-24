<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class IdeaReply extends Model
{
    use SoftDeletes;

    protected $dates = ['deleted_at'];

    public function idea()
    {
        return $this->belongsTo("App\Models\Idea", "idea_id");
    }

    public function user(){
        return $this->belongsTo("App\Models\User", "user_id");
    }
}
