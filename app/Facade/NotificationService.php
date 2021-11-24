<?php

namespace App\Facade;

use App\Services\Notification\NotificationService as RealNotificationService;
use Illuminate\Support\Facades\Facade;

class NotificationService extends Facade
{
    protected static function getFacadeAccessor()
    {
        return RealNotificationService::class;
    }
}
