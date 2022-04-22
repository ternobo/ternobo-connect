<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\ContactOption
 *
 * @property int $id
 * @property string $name
 * @property string $pattern
 * @property string $icon
 * @property string $starts_with
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|ContactOption newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ContactOption newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ContactOption query()
 * @method static \Illuminate\Database\Eloquent\Builder|ContactOption whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContactOption whereIcon($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContactOption whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContactOption whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContactOption wherePattern($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContactOption whereStartsWith($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContactOption whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ContactOption extends Model {
    //
}
