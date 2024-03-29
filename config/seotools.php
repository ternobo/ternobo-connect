<?php

/**
 * @see https://github.com/artesaos/seotools
 */

return [
    'meta' => [
        /*
         * The default configurations to be used by the meta generator.
         */
        'defaults' => [
            'title' => "Ternobo", // set false to total remove
            'titleBefore' => false, // Put defaults.title before page title, like 'It's Over 9000! - Dashboard'
            'description' => 'Ternobo is a social network for sharing your experiences, information, and interests freely. A place to learn, be aware, and build a better world.            ', // set false to total remove
            'separator' => ' / ',
            'keywords' => ["ternobo", 'social media'],
            'canonical' => null, // Set null for using Url::current(), set false to total remove
            'robots' => 'all', // Set to 'all', 'none' or any combination of index/noindex and follow/nofollow
        ],
        /*
         * Webmaster tags are always added.
         */
        'webmaster_tags' => [
            'google' => null,
            'bing' => null,
            'alexa' => null,
            'pinterest' => null,
            'yandex' => null,
            'norton' => null,
        ],

        'add_notranslate_class' => false,
    ],
    'opengraph' => [
        /*
         * The default configurations to be used by the opengraph generator.
         */
        'defaults' => [
            'title' => "Ternobo", // set false to total remove
            'description' => 'Ternobo is a social network for sharing your experiences, information, and interests freely. A place to learn, be aware, and build a better world.            ', // set false to total remove
            'url' => null, // Set null for using Url::current(), set false to total remove
            'type' => "Social Media",
            'site_name' => "Ternobo",
            'images' => [],
        ],
    ],
    'twitter' => [
        /*
         * The default values to be used by the twitter cards generator.
         */
        'defaults' => [
            //'card'        => 'summary',
            'site' => '@ternobo',
        ],
    ],
    'json-ld' => [
        /*
         * The default configurations to be used by the json-ld generator.
         */
        'defaults' => [
            'title' => "Ternobo", // set false to total remove
            'description' => 'Ternobo is a social network for sharing your experiences, information, and interests freely. A place to learn, be aware, and build a better world.            ', // set false to total remove
            'url' => null, // Set null for using Url::current(), set false to total remove
            'type' => 'WebPage',
            'images' => [],
        ],
    ],
];
