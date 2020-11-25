<?php

return [
    'name' => 'Ternobo',
    'manifest' => [
        'name' => env('APP_NAME', 'Ternobo'),
        'short_name' => 'Ternobo',
        'start_url' => '/',
        'background_color' => '#F5F5F5',
        'theme_color' => '#191919',
        'display' => 'standalone',
        'orientation' => 'any',
        'status_bar' => '#F5F5F5',
        'icons' => [
            '72x72' => [
                'path' => '/apple-touch-icon-72x72.png',
                'purpose' => 'any',
            ],
            '120x120' => [
                'path' => '/apple-touch-icon-120x120.png',
                'purpose' => 'any',
            ],
            '144x144' => [
                'path' => '/apple-touch-icon-144x144.png',
                'purpose' => 'any',
            ],
            '152x152' => [
                'path' => '/apple-touch-icon-152x152.png',
                'purpose' => 'any',
            ],
            '192x192' => [
                'path' => '/android-chrome-192x192.png',
                'purpose' => 'any',
            ],
        ],
        'splash' => [
            '640x1136' => '/images/icons/splash-640x1136.png',
            '750x1334' => '/images/icons/splash-750x1334.png',
            '828x1792' => '/images/icons/splash-828x1792.png',
            '1125x2436' => '/images/icons/splash-1125x2436.png',
            '1242x2208' => '/images/icons/splash-1242x2208.png',
            '1242x2688' => '/images/icons/splash-1242x2688.png',
            '1536x2048' => '/images/icons/splash-1536x2048.png',
            '1668x2224' => '/images/icons/splash-1668x2224.png',
            '1668x2388' => '/images/icons/splash-1668x2388.png',
            '2048x2732' => '/images/icons/splash-2048x2732.png',
        ],
        'shortcuts' => [
            [
                'name' => 'Shortcut Link 1',
                'description' => 'Shortcut Link 1 Description',
                'url' => '/shortcutlink1',
                'icons' => [
                    "src" => "/images/icons/icon-72x72.png",
                    "purpose" => "any",
                ],
            ],
            [
                'name' => 'Shortcut Link 2',
                'description' => 'Shortcut Link 2 Description',
                'url' => '/shortcutlink2',
            ],
        ],
        'custom' => [],
    ],
];
