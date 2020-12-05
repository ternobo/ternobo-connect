<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Action done by \App\Page
 *
 * All models are connected to database so just functions are defined and variables variables are dynamic.
 *
 * Variables :
 *      page_id - the page, did the action
 *      post_id - the post that action done on it
 *      action - enum(like, share, comment, follow, post)
 *      connected_to - some actions are connected to another data type for example comment action is connected to a App\Comment or follow action is connected to App\User
 *
 * Actions should be parsed base on their page(\App\Page) using \App\Page:parseAction($action)
 */
class Action extends Model
{

    /**
     * id of the page which did the action
     * @var integer
     */
    /**
     * the post that action done on it
     * @var integer
     */

    /**
     * action type (like, share, comment, post)
     * @var string
     */

    /**
     * some actions are connected to another data type for example comment action is connected to a App\Comment or follow action is connected to App\User
     * @var integer
     */

    use SoftDeletes;

    protected $dates = ['deleted_at'];

    public function post()
    {
        return $this->belongsTo("App\Models\Post", "post_id");
    }

    public function comment()
    {
        return $this->belongsTo("App\Models\Comment", "connected_to");
    }

}
