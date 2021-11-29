<?php

namespace App\Facade;

use App\Services\MonetizationService as ServicesMonetizationService;
use Illuminate\Support\Facades\Facade;

class MonetizationService extends Facade
{
    protected static function getFacadeAccessor()
    {
        return ServicesMonetizationService::class;
    }
}
