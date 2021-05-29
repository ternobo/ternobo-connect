<?php
namespace App;

use Closure;

class Tools
{
    public static function filled($data, $index)
    {
        return isset($data[$index]) && $data[$index] != null;
    }

    public static function randomCode($length = 32, Closure $checkFunction)
    {
        $result = "";
        $codeAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        $codeAlphabet .= "0123456789";

        for ($i = 0; $i < $length; $i++) {
            $result .= $codeAlphabet[mt_rand(0, strlen($codeAlphabet) - 1)];
        }

        if ($checkFunction($result)) {

            return $result;
        } else {
            return Tools::randomCode($length, $checkFunction);
        }
    }

}
