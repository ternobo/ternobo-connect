<?php
namespace Database\Factories;

/** @var \Illuminate\Database\Eloquent\Factory $factory */
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

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
            'name' => $firstname . " " . $lastname,
            'gender' => $gender,
            "profile" => $profile,
            "cover" => url("/img/cover.jpg"),
            "username" => $faker->unique()->userName,
            "phone_verified_at" => time(),
            "short_bio" => $faker->sentence(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
        ];
    }
}
