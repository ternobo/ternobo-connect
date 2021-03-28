<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Report extends Model
{

    use SoftDeletes;

    protected $fillable = [
        'status',
        'admin_note',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, "user_id");
    }

    public function reportable()
    {
        // dd(->toSql());
        return $this->morphTo("reportable", "reportable_type", "reportable_id");
    }

}
