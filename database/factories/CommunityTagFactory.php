<?php

namespace Database\Factories;

use App\Models\CommunityTag;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommunityTagFactory extends Factory
{
    protected $model = CommunityTag::class;
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            "name" => $this->faker->name(),
            "icon" => $this->faker->imageUrl(64, 64),
            "cover" => $this->faker->imageUrl(1140, 336),
        ];
    }
}
