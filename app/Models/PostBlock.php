<?php

namespace App\Models;

use App\Casts\PostBlockContentCast;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\PostBlock
 *
 * @property int $id
 * @property int $page_id
 * @property int $post_id
 * @property int|null $sort
 * @property mixed|null $content
 * @property string $type
 * @property array|null $meta
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|PostBlock newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PostBlock newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PostBlock query()
 * @method static \Illuminate\Database\Eloquent\Builder|PostBlock whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PostBlock whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PostBlock whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PostBlock whereMeta($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PostBlock wherePageId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PostBlock wherePostId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PostBlock whereSort($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PostBlock whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PostBlock whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class PostBlock extends Model
{
    use HasFactory;

    protected $casts = [
        "meta" => "array",
        "content" => PostBlockContentCast::class,
    ];

    protected $fillable = [
        "page_id",
        "post_id",
        "content",
        "type",
        "sort",
        "meta"
    ];
}
