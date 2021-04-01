<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
