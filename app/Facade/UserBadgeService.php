<?php

namespace App\Facade;

use App\Services\User\UserBadgeService as RealUserBadgeService;
use Illuminate\Support\Facades\Facade;

class UserBadgeService extends Facade
{
    protected static function getFacadeAccessor()
    {
        return RealUserBadgeService::class;
    }
}
