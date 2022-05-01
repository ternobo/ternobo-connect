<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\ContactData
 *
 * @property int $id
 * @property int $page_id
 * @property array $data
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|ContactData newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ContactData newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ContactData query()
 * @method static \Illuminate\Database\Eloquent\Builder|ContactData whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContactData whereData($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContactData whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContactData wherePageId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContactData whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ContactData extends Model
{
    use HasFactory;

    protected $fillable = [
        "data"
    ];

    protected $casts = [
        "data" => "array"
    ];
}
