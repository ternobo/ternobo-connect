<?php
namespace App;

use Illuminate\Support\Facades\Auth;

class Ternobo
{
    public static function currentPage()
    {
        return Auth::user()->personalPage;
    }
}
