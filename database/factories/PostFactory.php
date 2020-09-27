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
        $type = $faker->randomElement(array("article", "post"));
        $medias = [$faker->imageUrl()];
        // dd($page->id);
        $tags = [$faker->word, $faker->word, $faker->word];
        foreach ($tags as $tag) {
            if (Tag::where("name", $tag)->first() instanceof Tag) {
                continue;
            }
            $tt = new Tag();
            $tt->name = $tag;
            $tt->save();
        }
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
        if ($type === "article") {
            $title = $faker->company;
        }

        return [
            "page_id" => $page->id,
            "user_id" => $page->user_id,
            "text" => $faker->paragraph,
            "medias" => json_encode($medias),
            "tags" => json_encode($tags),
            "category_id" => $category->id,
            "type" => $type,
            "title" => $title,
            "created_at" => $faker->dateTimeThisYear(),
        ];
    }
}
