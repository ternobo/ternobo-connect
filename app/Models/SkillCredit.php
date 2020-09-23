<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SkillCredit extends Model {

    public function user() {
        return $this->belongsTo("App\User","user_id");
    }
    
    public function skill(){
        return $this->belongsTo("App\Skill","skill_id");
    }

}
