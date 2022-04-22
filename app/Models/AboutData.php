<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\AboutData
 *
 * @property int $id
 * @property int $page_id
 * @property array $data
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|AboutData newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AboutData newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AboutData query()
 * @method static \Illuminate\Database\Eloquent\Builder|AboutData whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AboutData whereData($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AboutData whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AboutData wherePageId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AboutData whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class AboutData extends Model
{
    use HasFactory;

    protected $fillable = [
        "data"
    ];

    protected $casts = [
        "data" => "array"
    ];
}
