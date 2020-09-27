<?php

namespace Database\Factories;

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ConnectionFactory extends Factory
{
    protected $model = Following::class;
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $faker = $this->faker;
        $fakeUser = User::all()->random();
        $fakeUser2 = User::where("id", "!=", $fakeUser->id)->get()->random();
        $accepted = $faker->randomElement([true, false]);
        return [
            "user_id" => $fakeUser2->id,
            "connection" => $fakeUser->id,
            "accepted" => true,
        ];
    }
}
