<?php

namespace App;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class Ternobo
{
    public static function isUserLogedIn()
    {
        return Auth::check() && Auth::user() instanceof User;
    }

    /**
     * @return App\Model\Page
     */
    public static function currentPage()
    {
        return Auth::check() && Auth::user() instanceof User ? Auth::user()->personalPage : null;
    }
}
