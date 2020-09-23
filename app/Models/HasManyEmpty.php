<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\HasMany;

class HasManyEmpty extends HasMany
{
    public function getResults()
    {
        return Collection::make();
    }

    public function get($columns = ['*'])
    {
        return Collection::make();
    }
}
