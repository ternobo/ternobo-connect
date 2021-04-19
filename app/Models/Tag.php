<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
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
