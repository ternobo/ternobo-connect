<?php

namespace App\Services\User;

use App\Models\Partner;
use App\Models\Ternobomate;
use App\Models\User;
use App\Services\MonitizationService;
use App\Services\RestfulService;
use Carbon\Carbon;

class UserBadgeService extends RestfulService
{

    private MonitizationService $monitizationService;

    public function __construct(MonitizationService $monitizationService)
    {
        $this->monitizationService = $monitizationService;
    }

    public function getUserBadge($user_id)
    {
        return [
            "ternobomate" => $this->checkTernoboMate($user_id),
            "ternobopartner" => $this->monitizationCheck($user_id),
            "newcommer" => $this->checkNewCommer($user_id),
            "visitor" => $this->checkVisitor($user_id),
        ];
    }

    private function checkVisitor($user_id)
    {
        $user = User::query()->findOrFail($user_id);
        return !$user->personalPage->visible;
    }

    private function monitizationCheck($user_id)
    {
        return Partner::query()->where("user_id", $user_id)->exists();
    }

    private function checkNewCommer($user_id)
    {
        $user = User::query()->findOrFail($user_id);
        $carbon = new Carbon();
        $now = $carbon->now();
        return ($now->timestamp - $user->created_at->timestamp) < (3600 * 24 * 14);
    }

    private function checkTernoboMate($user_id)
    {
        return Ternobomate::query()->where("user_id", $user_id)->exists();
    }
}
