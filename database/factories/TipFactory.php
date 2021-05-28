<?php

namespace Database\Factories;

use App\Models\Post;
use App\Models\Tip;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class TipFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Tip::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $user = User::all()->random();
        $post_id = Post::all()->random();
        $amount = random_int(1000, 1000000);
        $randIP = mt_rand(0, 255) . "." . mt_rand(0, 255) . "." . mt_rand(0, 255) . "." . mt_rand(0, 255);
        $fake_refrence = $this->faker->randomNumber(8, true);
        $fake_anonymous = $this->faker->randomElement([true, false]);
        return [
            "post_id" => $post_id,
            "user_id" => $user->id,
            "amount" => $amount,
            "anonymous" => $fake_anonymous,
            "meta" => [
                "ip" => $randIP,
                "reference_id" => $fake_refrence,
                "transaction_id" => $fake_refrence * 1000,
            ],
        ];
    }
}
