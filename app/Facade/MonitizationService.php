<?php

namespace App\Facade;

use App\Services\MonitizationService as ServicesMonitizationService;
use Illuminate\Support\Facades\Facade;

class MonitizationService extends Facade
{
    protected static function getFacadeAccessor()
    {
        return ServicesMonitizationService::class;
    }
}
