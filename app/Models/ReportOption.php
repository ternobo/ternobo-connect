<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
