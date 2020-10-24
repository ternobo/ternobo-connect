<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Connection extends Model {

    public function connection(){
        return $this->belongsTo("App\Models\User", "connection");
    }

    public function user() {
        return $this->belongsTo("App\Models\User", "user_id");
    }

}
