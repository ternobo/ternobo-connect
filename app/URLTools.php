<?php

namespace App;

use Illuminate\Support\Str;

class URLTools
{
    public static function toURL($url)
    {
        $url = (string) Str::of($url)->trim();
        // dd((Str::startsWith($url, "https://") || Str::startsWith($url, "https://")));
        return (Str::startsWith($url, "https://") || Str::startsWith($url, "https://")) ? $url : "http://" . $url;
    }
}
