<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\SearchSuggestion
 *
 * @property int $id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|SearchSuggestion newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SearchSuggestion newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SearchSuggestion query()
 * @method static \Illuminate\Database\Eloquent\Builder|SearchSuggestion whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SearchSuggestion whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SearchSuggestion whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SearchSuggestion whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class SearchSuggestion extends Model {
    protected $fillable = [
        "name"
    ];
}
