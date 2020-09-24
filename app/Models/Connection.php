<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Connection extends Model {

    public function user() {
        if ("" . $this->user_id === "" . Auth::user()->id) {
            return $this->belongsTo("App\Models\User", "connection");
        } else {
            return $this->belongsTo("App\Models\User", "user_id");
        }
    }

}
