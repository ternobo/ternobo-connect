<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\HelpCategory
 *
 * @property int $id
 * @property string $name
 * @property int|null $parent_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|HelpCategory[] $children
 * @property-read int|null $children_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\HelpPost[] $posts
 * @property-read int|null $posts_count
 * @method static \Illuminate\Database\Eloquent\Builder|HelpCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|HelpCategory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|HelpCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder|HelpCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HelpCategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HelpCategory whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HelpCategory whereParentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HelpCategory whereUpdatedAt($value)
 * @mixin \Eloquent
 */
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
