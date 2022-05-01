<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\Report
 *
 * @property int $id
 * @property string $reportable_id
 * @property string $reportable_type
 * @property \App\Models\ReportOption|null $reason
 * @property string $status
 * @property string|null $description
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ReportNote[] $adminNotes
 * @property-read int|null $admin_notes_count
 * @property-read Model|\Eloquent $reportable
 * @property-read \App\Models\User $reportedBy
 * @method static \Illuminate\Database\Eloquent\Builder|Report newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Report newQuery()
 * @method static \Illuminate\Database\Query\Builder|Report onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Report query()
 * @method static \Illuminate\Database\Eloquent\Builder|Report whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Report whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Report whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Report whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Report whereReason($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Report whereReportableId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Report whereReportableType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Report whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Report whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Report whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|Report withTrashed()
 * @method static \Illuminate\Database\Query\Builder|Report withoutTrashed()
 * @mixin \Eloquent
 */
class Report extends Model
{

    use SoftDeletes;

    protected $fillable = [
        'status',
    ];

    public function adminNotes()
    {
        return $this->hasMany(ReportNote::class);
    }

    public function reason()
    {
        return $this->belongsTo(ReportOption::class, "reason");
    }

    public function reportedBy()
    {
        return $this->belongsTo(User::class, "user_id");
    }

    public function reportable()
    {
        return $this->morphTo("reportable", "reportable_type", "reportable_id");
    }
}
