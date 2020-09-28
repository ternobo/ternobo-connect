<?php
namespace Database\Factories;

use App\Models\Following;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class FollowingFactory extends Factory
{
    protected $model = Following::class;
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            "user_id" => 508,
            "following" => User::query()->where("id", "!=", 508)->get()->random(),
        ];
    }
}
