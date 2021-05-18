<?php

namespace Database\Seeders;

use App\Models\SocialDriver;
use Illuminate\Database\Seeder;

class SeedSocials extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $social_drivers = [
            "google" => [
                'icon' => '/images/socials/gmail.png',
                'name' => "Gmail",
            ],
            'facebook' => [
                'icon' => '/images/socials/facebook.png',
                'name' => "Facebook",
            ],
            "github" => [
                'icon' => '/images/socials/github.png',
                'name' => "GitHub",
            ],
            'yahoo' => [
                'icon' => '/images/socials/yahoo.png',
                'name' => "Yahoo",
            ],
            'youtube' => [
                'icon' => '/images/socials/youtube.png',
                'name' => "YouTube",
            ],
            'instagram' => [
                'icon' => '/images/socials/instagram.png',
                'name' => "Instagram",
            ],
            'telegram' => [
                'icon' => '/images/socials/telegram.png',
                'name' => "telegram",
            ],
            'twitter' => [
                'icon' => '/images/socials/twitter.png',
                'name' => "Twitter",
            ],
            'twitch' => [
                'icon' => '/images/socials/twitch.png',
                'name' => "Twitch",
            ],
            'dribbble' => [
                'icon' => '/images/socials/dribbble.png',
                'name' => "Dribbble",
            ],
            'spotify' => [
                'icon' => '/images/socials/spotify.png',
                'name' => "Spotify",
            ],
            'discord' => [
                'icon' => '/images/socials/discord.png',
                'name' => "Discord",
            ],
        ];

        foreach ($social_drivers as $key => $socials) {
            SocialDriver::create([
                'driver' => $key,
                'icon' => $socials['icon'],
                'name' => $socials['name'],
            ]);
        }

    }
}
