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
            // "google" => [
            //     'icon' => '/images/socials/gmail.png',
            //     'name' => "Gmail",
            //     'link' => "mailto:",
            // ],

            'yahoo' => [
                'icon' => '/images/socials/yahoo.png',
                'name' => "Yahoo",
                'link' => "mailto:",

            ],
            'facebook' => [
                'icon' => '/images/socials/facebook.png',
                'name' => "Facebook",
                'link' => "https://facebook.com/",

            ],

            'twitter' => [
                'icon' => '/images/socials/twitter.png',
                'name' => "Twitter",
                'link' => "https://twitter.com/",
            ],

            // 'youtube' => [
            //     'icon' => '/images/socials/youtube.png',
            //     'name' => "YouTube",
            //     'link' => "https://youtube.com/channel/",

            // ],

            'instagram' => [
                'icon' => '/images/socials/instagram.png',
                'name' => "Instagram",
                'link' => "https://instagram.com/",

            ],
            "github" => [
                'icon' => '/images/socials/github.png',
                'name' => "GitHub",
                'link' => "https://github.com/",

            ],
            'dribbble' => [
                'icon' => '/images/socials/dribbble.png',
                'name' => "Dribbble",
                'link' => "https://dribbble.com/",

            ],
            'twitch' => [
                'icon' => '/images/socials/twitch.png',
                'name' => "Twitch",
                'link' => "https://twitch.tv/",

            ],
            'spotify' => [
                'icon' => '/images/socials/spotify.png',
                'name' => "Spotify",
                'link' => null,
            ],
            'discord' => [
                'icon' => '/images/socials/discord.png',
                'name' => "Discord",
                'link' => "https://discord.com/users/",
            ],
            'telegram' => [
                'icon' => '/images/socials/telegram.png',
                'name' => "telegram",
                "link" => "https://t.me/",
            ],
        ];
        SocialDriver::all()->delete();
        foreach ($social_drivers as $key => $social) {
            SocialDriver::create([
                'driver' => $key,
                'icon' => $social['icon'],
                'name' => $social['name'],
                'link' => $social['link'],
                'active' => true,
            ]);
        }

    }
}
