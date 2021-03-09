<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Connection extends Model
{

    public function connection()
    {
        return $this->belongsTo("App\Models\User", "connection_id")->where("id", "!=", Auth::user()->id);
    }

    public function user()
    {
        return $this->belongsTo("App\Models\User", "user_id")->where("id", "!=", Auth::user()->id);
    }

    public function toArray()
    {
        $data = parent::toArray();
        if (isset($data['user'])) {
            $data['user'] = $data['connection'] ? $data['connection'] : $data['user'];
        }
        return $data;
    }

}
