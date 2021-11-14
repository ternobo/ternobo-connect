<?php

namespace App\Services\DataExtraction;

use App\Models\Post;
use App\Models\Tag;

class DataExtractionService
{
    public function getAllPosts()
    {
        return Post::all();
    }

    public function getPostsByHashtag(string $tag)
    {
        return Post::withRelations()->whereJsonContains("tags", $tag)->get();
    }

    public function getAllTags()
    {
        return Tag::all();
    }
}
