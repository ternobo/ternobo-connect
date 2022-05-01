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
 *
 * @property int $id
 * @property int $page_id
 * @property int $post_id
 * @property string $action
 * @property int|null $connected_to
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \App\Models\Comment|null $comment
 * @property-read \App\Models\Post $post
 * @method static \Illuminate\Database\Eloquent\Builder|Action newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Action newQuery()
 * @method static \Illuminate\Database\Query\Builder|Action onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Action query()
 * @method static \Illuminate\Database\Eloquent\Builder|Action whereAction($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Action whereConnectedTo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Action whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Action whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Action whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Action wherePageId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Action wherePostId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Action whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|Action withTrashed()
 * @method static \Illuminate\Database\Query\Builder|Action withoutTrashed()
 * @mixin \Eloquent
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

    /**
     * The "booted" method of the model.
     *
     * @return void
     */
    protected static function booted()
    {
        static::addGlobalScope(function ($query) {
            return $query->whereHas("post");
        });
    }

    public function post()
    {
        return $this->belongsTo(Post::class, "post_id");
    }

    public function comment()
    {
        return $this->belongsTo("App\Models\Comment", "connected_to");
    }
}
