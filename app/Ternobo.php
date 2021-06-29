<?php
namespace App;

use Illuminate\Support\Facades\Auth;

class Ternobo
{
    /**
     * @return App\Model\Page
     */
    public static function currentPage()
    {
        return Auth::user()->personalPage;
    }
}
