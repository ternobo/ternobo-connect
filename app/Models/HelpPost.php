<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\HelpPost
 *
 * @property int $id
 * @property string $title
 * @property string $text
 * @property int $category_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|HelpPost newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|HelpPost newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|HelpPost query()
 * @method static \Illuminate\Database\Eloquent\Builder|HelpPost whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HelpPost whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HelpPost whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HelpPost whereText($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HelpPost whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|HelpPost whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class HelpPost extends Model
{
    //
}
