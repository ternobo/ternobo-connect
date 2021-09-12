<?php
function is_multi_array($a)
{
    foreach ($a as $v) {
        if (is_array($v)) return true;
    }
    return false;
}

function is_string_array($a)
{
    $a = new RecursiveIteratorIterator(new RecursiveArrayIterator($a));
    foreach ($a as $v) {
        if (!is_string($v)) return false;
    }
    return true;
}
