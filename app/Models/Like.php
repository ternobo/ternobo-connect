<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    /**
     * Page that like the post
     * @var \App\Page
     */

    public function page()
    {
        return $this->belongsTo("App\Models\Page");
    }

    public function notification()
    {
        return $this->hasOne(Notification::class, "connected_to")->where("action", "like");
    }

    public function delete()
    {
        $this->notification()->delete();
        return parent::delete();
    }

}
