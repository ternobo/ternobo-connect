<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SkillCredit extends Model
{

    public function user()
    {
        return $this->belongsTo("App\Models\User", "user_id");
    }

    public function skill()
    {
        return $this->belongsTo("App\Models\Skill", "skill_id");
    }

    public function notification()
    {
        return $this->hasOne(Notification::class, "connected_to")->where("action", "notification");
    }

    public function delete()
    {
        $this->notification()->delete();
        parent::delete();
    }
}
