<?php

namespace App\Models;

use App\HasPage;
use Illuminate\Database\Eloquent\Model;

/**
 * All models are connected to database so just functions are defined and variables variables are dynamic.
 * 
 * Variables :
 *      name - bookmarked post id
 *      sort_place - bookmarked post
 *      page_id - id of owner page
 *      created_at - bookmark date
 *      posts - list of posts (array of \App\Post
 *
 * @property int $id
 * @property int $page_id
 * @property string $name
 * @property string $type
 * @property int $sort_place
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $deleted_at
 * @property-read \App\Models\Page $page
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Post[] $posts
 * @property-read int|null $posts_count
 * @method static \Illuminate\Database\Eloquent\Builder|Category newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Category newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Category query()
 * @method static \Illuminate\Database\Eloquent\Builder|Category whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Category whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Category whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Category whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Category wherePageId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Category whereSortPlace($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Category whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Category whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Category extends Model
{
    use HasPage;
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
