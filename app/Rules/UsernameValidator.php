<?php

namespace App\Rules;

use App\Models\Page;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

class UsernameValidator implements Rule
{

    private $router;

    private $reserved_usernames;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->reserved_usernames = array_merge([
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
            "sitemap.xml",
            "ternobo-socials",
            'ternobo-telegram',
            "js",
            'img',
            'css',
            'fonts',
            'images',
            "android-chrome-192x192.png",
            "apple-touch-icon-57x57.png",
        ], scandir(public_path()));
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
        $username = strtolower($username);

        $route_name = Route::getRoutes()->get();

        $invalid = [];
        foreach ($route_name as $route) {
            if (in_array("GET", $route->methods)) {
                if (!Str::containsAll($route->uri, ["{page}"])) {
                    if ($route->uri !== "/") {
                        $pos = strpos($route->uri, "/");
                        if ($pos !== false) {
                            $invalid[] = Str::substr($route->uri, $pos + 1);
                        }
                        $invalid[] = $route->uri;
                    }
                }
            }
        }

        if (in_array(strtolower($username), $invalid)) {
            return false;
        }

        if (!preg_match("/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{3,29}$/", $username)) {
            return false;
        }

        if (!Page::checkSlug($username)) {
            return false;
        }

        return true;

    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'نام کاربری نامعتبر است.';
    }
}
