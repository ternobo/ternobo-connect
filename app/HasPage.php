<?php

namespace App;

use App\Scopes\ActivePageScope;

trait HasPage
{
    protected static function booted()
    {
        static::addGlobalScope(new ActivePageScope);
    }
}
