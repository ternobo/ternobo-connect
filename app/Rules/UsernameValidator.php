<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

use Illuminate\Routing\Router;

class UsernameValidator implements Rule
{

    private $router;

    private $reserved_usernames = [
        'admin',
        'moderator',
        "help",
         "admin",
         "ternobo",
         "changelog",
         "feedback",
          "dashboard",
          "report",
           "sitemap",
            "sitemap.xml"
    ];

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct(Router $router)
    {
        $this->router = $router;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $username
     * @return bool
     */
    public function passes($attribute, $username)
    {
        $username = trim(strtolower($username));
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'The validation error message.';
    }
}
