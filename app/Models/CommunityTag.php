<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\App;

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
        'tag_id',
        'community_category_id'
    ];


    public function toArray()
    {
        $data = parent::toArray();
        $locale = App::getLocale();
        $translation = CommunityTranslation::query()->where("tag", $data['name'])->where("locale", $locale)->first();
        $data['name'] = $translation instanceof CommunityTranslation ? $translation->translation : $data['name'];
        $data['tag'] = $this->tag->name;
        return $data;
    }

    public function category()
    {
        return $this->belongsTo(CommunityCategory::class);
    }

    public function transactions()
    {
        return $this->hasMany(CommunityTranslation::class, 'tag', 'name');
    }

    public function tag()
    {
        return $this->belongsTo(Tag::class);
    }
}
