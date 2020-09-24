<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

class Following extends Model {

    use SoftDeletes;

    protected $dates = ['deleted_at'];

    /**
     * return the following user
     *
     * @var \App\Following
     */

    public function user() {
        if (Auth::user()->id === $this->following) {
            return $this->belongsTo("App\Models\User", "user_id");
        }
        return $this->belongsTo("App\Models\Page", "following");
    }

}
