<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

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

    public function reportedBy()
    {
        return $this->belongsTo(User::class, "user_id");
    }

    public function reportable()
    {
        // dd(->toSql());
        return $this->morphTo("reportable", "reportable_type", "reportable_id");
    }

}
