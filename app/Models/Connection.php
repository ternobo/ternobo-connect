<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Connection extends Model
{

    public function connection()
    {
        return $this->belongsTo("App\Models\User", "connection_id");
    }

    public function user()
    {
        return $this->belongsTo("App\Models\User", "user_id");
    }

}
