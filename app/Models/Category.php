<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 *
 * All models are connected to database so just functions are defined and variables variables are dynamic.
 * Variables :
 *      name - bookmarked post id
 *      sort_place - bookmarked post
 *      page_id - id of owner page
 *      created_at - bookmark date
 *      posts - list of posts (array of \App\Post
 */
class Category extends Model
{
    /**
     * category name
     * @var string
     */
    /**
     * index in list
     * @var integer
     */
    /**
     * id of owner page
     * @var integer
     */

    /**
     * list of posts
     * @var array
     */
    protected $fillable = [
        'name', 'page_id', "type",
    ];

    public function posts()
    {
        return $this->hasMany("App\Models\Post", "category_id");
    }

    public function page()
    {
        return $this->belongsTo("App\Models\Page", "page_id");
    }

}
