<?php

namespace App\Models;

use App\HasPage;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\FollowSuggestion
 *
 * @property int $id
 * @property int $page_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Page $page
 * @method static \Illuminate\Database\Eloquent\Builder|FollowSuggestion newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|FollowSuggestion newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|FollowSuggestion query()
 * @method static \Illuminate\Database\Eloquent\Builder|FollowSuggestion whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FollowSuggestion whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FollowSuggestion wherePageId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FollowSuggestion whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class FollowSuggestion extends Model
{
    use HasPage;

    public function page()
    {
        return $this->belongsTo("App\Models\Page");
    }
}
