<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommunityTranslation extends Model
{
    use HasFactory;

    protected $table = "community_tags_translations";

    protected $fillable = [
        'tag',
        'translation',
        'locale'
    ];
}
