<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HelpCategory extends Model
{
    public function posts()
    {
        return $this->hasMany("App\Models\HelpPost", "category_id");
    }

    public function children()
    {
        return $this->hasMany("App\Models\HelpCategory", "parent_id")->with("posts");
    }
}
