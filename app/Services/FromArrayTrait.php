<?php

namespace App\Services;

trait FromArrayTrait
{
    public static function fromArray(array $data = [])
    {
        foreach (get_object_vars($obj = new self) as $property => $default) {
            if (!array_key_exists($property, $data)) continue;
            $obj->{$property} = $data[$property]; // assign value to object
        }
        return $obj;
    }
}
