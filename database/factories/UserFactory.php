<?php
namespace Database\Factories;

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    protected $model = User::class;

/**
 * Define the model's default state.
 *
 * @return array
 */
    public function definition()
    {
        $faker = $this->faker;
        $gender = $faker->randomElement(array(1, 2));
        $profile = url("/images/woman-profile.png");
        $firstname = $faker->firstName;
        $lastname = $faker->lastName;
        if ($gender === 2) {
            $profile = url("/images/man-profile.png");
        }
        return [
            "first_name" => $firstname,
            "last_name" => $lastname,
            'gender' => $gender,
            "profile" => $profile,
            "cover" => url("/img/cover.jpg"),
            "username" => $faker->unique()->userName,
            "phone_verified_at" => time(),
            "short_bio" => $faker->sentence(),
            'password' => Hash::make("12345678"), // password
            'remember_token' => Str::random(10),
        ];
    }
}
