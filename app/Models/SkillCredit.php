<?php

namespace App\Models;

use App\HasUser;
use Illuminate\Database\Eloquent\Model;

class SkillCredit extends Model
{
    use HasUser;

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
        return parent::delete();
    }
}
