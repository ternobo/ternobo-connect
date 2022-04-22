<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\ReportNote
 *
 * @property int $id
 * @property int $report_id
 * @property array $content
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|ReportNote newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ReportNote newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ReportNote query()
 * @method static \Illuminate\Database\Eloquent\Builder|ReportNote whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ReportNote whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ReportNote whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ReportNote whereReportId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ReportNote whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ReportNote whereUserId($value)
 * @mixin \Eloquent
 */
class ReportNote extends Model
{
    use HasFactory;
    protected $fillable = [
        'report_id',
        'content',
    ];

    protected $casts = [
        'content' => "array",
    ];

    public function user()
    {
        return $this->belongsTo(User::class, "user_id");
    }

}
