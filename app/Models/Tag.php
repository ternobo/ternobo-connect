<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

class Tag extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    protected $hidden = [
        'created_at',
        "updated_at"
    ];

    public static function addTag($tags): Collection
    {
        $list = collect([]);
        foreach ($tags as $tag) {
            $list->add(Tag::query()->firstOrCreate([
                'name' => $tag,
            ]));
        }
        return $list->pluck("id");
    }

    public function community()
    {
        return $this->hasOne(CommunityTag::class);
    }

    public function posts()
    {
        return $this->belongsToMany(Post::class);
    }
}
