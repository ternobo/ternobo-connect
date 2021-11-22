<?php

namespace App\Services\User;

use App\Models\Ternobomate;
use App\Models\User;
use App\Services\RestfulService;
use Carbon\Carbon;

class UserBadgeService extends RestfulService
{

    public function getUserBadge($user_id)
    {
        return [
            "ternobomate" => $this->checkTernoboMate($user_id),
            "visitor" => $this->checkVisitor($user_id),
            "newcommer" => $this->checkNewCommer($user_id)
        ];
    }

    private function checkVisitor($user_id)
    {
        $user = User::query()->findOrFail($user_id);
        return !$user->personalPage->visible;
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
