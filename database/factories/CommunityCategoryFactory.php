<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Storage;

class CommunityCategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $icon = $this->faker->imageUrl(44, 44);
        return [
            "name" => $this->faker->name(),
            "icon" => $icon,
        ];
    }
}
