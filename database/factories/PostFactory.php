<?php

namespace Database\Factories;

/** @var \Illuminate\Database\Eloquent\Factory $factory */
/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Category;
use App\Models\Page;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Database\Eloquent\Factories\Factory;

class PostFactory extends Factory
{
    protected $model = Post::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $faker = $this->faker;

        $page = Page::where("id", "!=", 1)->get()->random();

        $medias = [$faker->imageUrl()];


        $availableTags = Tag::all()->random(3)->pluck("name");

        $tags = $faker->randomElements($availableTags, 3, false);

        $category_name = $faker->word;
        $category = null;
        if ((Category::where("name", $category)->first() instanceof Category)) {
            $category = Category::where("name", $category_name)->first();
        } else {
            $category = new Category();
            $category->name = $category_name;
            $category->page_id = $page->id;
            $category->save();
        }
        $title = null;

        return [
            "page_id" => $page->id,
            "user_id" => $page->user_id,
            "text" => $faker->paragraph,
            "media" => [],
            "tags" => $tags,
            "category_id" => $category->id,
            "type" => "post",
            "title" => $title,
            "show" => "public",
            "created_at" => $faker->dateTimeThisYear(),
        ];
    }
}
