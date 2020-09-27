<?php
namespace Database\Factories;

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use App\Models\Page;
use Illuminate\Database\Eloquent\Factories\Factory;

class SuggestionFactory extends Factory
{
/**
 * Define the model's default state.
 *
 * @return array
 */
    public function definition()
    {
        $page_id = Page::all()->random()->id;
        return [
            "page_id" => $page_id,
        ];
    }
}