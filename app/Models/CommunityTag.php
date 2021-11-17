<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommunityTag extends Model
{
    use HasFactory;

    protected $hidden = [
        'created_at',
        'updated_at',
        'tag_id',
    ];

    protected $fillable = [
        'name',
        'icon',
        'cover',
        'tag_id'
    ];

    private function tag()
    {
        return $this->belongsTo(Tag::class);
    }
}
