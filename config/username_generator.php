<?php

use App\Models\Page;
use TaylorNetwork\UsernameGenerator\Drivers\EmailDriver;
use TaylorNetwork\UsernameGenerator\Drivers\NameDriver;

return [

    /*
     * Should the username generated be unique?
     */
    'unique' => true,

    /*
     * The minimum length of the username.
     *
     * Set to 0 to not enforce
     */
    'min_length' => 4,

    /*
     * Want to throw a UsernameTooShort exception when too short?
     */
    'throw_exception_on_too_short' => false,

    /*
     * Convert the case of the generated username
     *
     * One of 'lower', 'upper', or 'mixed'
     */
    'case' => 'lower',

    /*
     * Convert spaces in username to a separator
     */
    'separator' => '_',

    /*
     * Model to check if the username is unique to.
     *
     * This is only used if unique is true
     */
    'model' => Page::class,

    /*
     * Database field to check and store username
     */
    'column' => 'slug',

    /*
     * Allowed characters from the original unconverted text
     */
    'allowed_characters' => 'a-zA-Z ',

    /*
     * Loaded drivers for converting to a username
     */
    'drivers' => [
        'name'  => NameDriver::class,
        'email' => EmailDriver::class,
    ],

    /*
     * Add your own adjective and nouns word lists here if don't want to use the default
     */
    'dictionary' => [
        'adjectives' => [],
        'nouns'      => [],
    ],

];
