<?php
namespace App;

class Tools
{
    public static function filled($data, $index)
    {
        return isset($data[$index]) && $data[$index] != null;
    }
}
