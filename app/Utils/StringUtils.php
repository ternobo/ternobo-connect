<?php

namespace App\Utils;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Closure;

class StringUtils
{
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


    public static function fixPhoneNumber(string $phone)
    {
        return Str::startsWith($phone, "0") ? "+98" . substr($phone, 1) : (Str::startsWith($phone, "+98") ? $phone : "+98" . $phone);
    }


    public static function isBase64($value)
    {
        return !Validator::make(['data' => $value], ["data" => "regex:/^data:(?<mimetype>[a-z\-]+\/(?<extension>[a-z\-]+));base64,(?<base64>[A-Za-z0-9\+\/=]+)$/"])->fails();
    }
}
