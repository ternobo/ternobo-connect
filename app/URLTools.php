<?php

namespace App;

use Illuminate\Support\Str;

class URLTools
{
    public static function toURL($url)
    {
        $url = (string) Str::of($url)->trim();
        return (Str::startsWith($url, "https://") || Str::startsWith($url, "http://")) ? $url : "http://" . $url;
    }
}
