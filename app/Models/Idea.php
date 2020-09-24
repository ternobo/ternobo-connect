<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

/**
 * @property mixed description
 * @property mixed title
 */
class Idea extends Model
{
    use SoftDeletes;

    protected $dates = ['deleted_at'];

    public function replies()
    {
        return $this->hasMany("App\Models\IdeaReply", "idea_id")->where("pinned", false)->latest();
    }

    public function user()
    {
        return $this->belongsTo("App\Models\User", "user_id");
    }

    public function votes()
    {
        return $this->hasMany("App\Models\IdeaVote", "idea_id");
    }

    public function isVoted()
    {
        return IdeaVote::query()->where("user_id", Auth::user()->id)->where("idea_id", $this->id)->exists();
    }

    public function isBookmarked(){
        return IdeaBookmark::query()->where("user_id", Auth::user()->id)->where("idea_id", $this->id)->exists();
    }

}
