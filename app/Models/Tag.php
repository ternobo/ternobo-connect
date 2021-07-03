<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{

    protected $fillable = [
        'name',
    ];

    public static function addTag($tags)
    {
        $list = [];
        foreach ($tags as $tag) {
            if (!Tag::query()->where("name", $tag)->exists()) {
                array_push($tags, Tag::create([
                    'name' => $tag,
                ]));
            }
        }
        return $list;
    }

    private function posts_count()
    {
        return Post::query()->whereJsonContains("tags", $this->name)->count();
    }

    public function toArray()
    {
        $data = parent::toArray();
        $data['posts_count'] = $this->posts_count();
        return $data;
    }
}
