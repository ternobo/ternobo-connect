<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Announcement
 *
 * @property int $id
 * @property string $title
 * @property string $text
 * @property string|null $link
 * @property string|null $link_text
 * @property string|null $icon
 * @property int|null $user_id
 * @property bool $has_confetti
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Announcement newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Announcement newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Announcement query()
 * @method static \Illuminate\Database\Eloquent\Builder|Announcement whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Announcement whereHasConfetti($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Announcement whereIcon($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Announcement whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Announcement whereLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Announcement whereLinkText($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Announcement whereText($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Announcement whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Announcement whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Announcement whereUserId($value)
 * @mixin \Eloquent
 */
class Announcement extends Model
{
    use HasFactory;

    protected $casts = [
        "has_confetti" => "boolean",
    ];

    protected $fillable = [
        "title",
        "text",
        "icon",
        "user_id",
        "has_confetti"
    ];
}
