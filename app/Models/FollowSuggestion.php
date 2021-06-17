<?php

namespace App\Models;

use App\HasPage;
use Illuminate\Database\Eloquent\Model;

class FollowSuggestion extends Model
{
    use HasPage;

    public function page()
    {
        return $this->belongsTo("App\Models\Page");
    }
}
