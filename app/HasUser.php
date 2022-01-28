<?php

namespace App;

use App\Scopes\ActiveUserScope;

trait HasUser
{
    protected static function booted()
    {
        static::addGlobalScope(new ActiveUserScope);
    }

    public static function withoutActiveUser(): \Illuminate\Database\Eloquent\Builder
    {
        static::withoutGlobalScope(ActiveUserScope::class);
    }
}
