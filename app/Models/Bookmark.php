<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * 
 * All models are connected to database so just functions are defined and variables variables are dynamic.
 * 
 * Variables : 
 *      post_id - bookmarked post id
 *      action - \App\Post bookmarked post
 *      created_at - bookmark date
 */
class Bookmark extends Model {

    /**
     * this function is returning relation and it's using it privately to generate $post variable
     * 
     * @return type App\Post
     */
    public function post() {
        return $this->belongsTo("App\Models\Post", "post_id");
    }

}
