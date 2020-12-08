<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

class Following extends Model
{

    use SoftDeletes;

    protected $dates = ['deleted_at'];

    /**
     * return the following user
     *
     * @var \App\Following
     */

    public function page()
    {
        return $this->belongsTo("App\Models\Page", "following")->with("user");
    }

    public function follower()
    {
        return $this->belongsTo("App\Models\Page", "user_id")->with("user");
    }

    public function toArray()
    {
        $array = parent::toArray();
        if (Auth::user()->id === $this->following) {
            $array['page'] = $this->follower;
        } else {
            $array['page'] = $this->page;
        }
        return $array;
    }

}
