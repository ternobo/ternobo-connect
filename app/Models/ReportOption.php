<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\ReportOption
 *
 * @property int $id
 * @property string $key
 * @property string $for
 * @property string $text
 * @property string|null $description
 * @property string $parent
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|ReportOption[] $subreasons
 * @property-read int|null $subreasons_count
 * @method static \Illuminate\Database\Eloquent\Builder|ReportOption newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ReportOption newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ReportOption query()
 * @method static \Illuminate\Database\Eloquent\Builder|ReportOption whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ReportOption whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ReportOption whereFor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ReportOption whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ReportOption whereKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ReportOption whereParent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ReportOption whereText($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ReportOption whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class ReportOption extends Model
{
    use HasFactory;

    protected $fillable = [
        'key',
        'for',
        'text',
        'description',
        'parent',
    ];

    public function subreasons()
    {
        return $this->hasMany(ReportOption::class, "parent");
    }

}
