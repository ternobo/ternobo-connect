<?php

namespace App\Services\User;

use App\Models\Page;
use App\Models\Partner;
use App\Models\Ternobomate;
use App\Models\User;
use App\Services\MonetizationService;
use App\Services\RestfulService;
use Carbon\Carbon;

class UserBadgeService extends RestfulService
{

    private MonetizationService $monitizationService;

    public function __construct(MonetizationService $monitizationService)
    {
        $this->monitizationService = $monitizationService;
    }

    public function getUserBadge($user_id, $page = null)
    {
        $user = $user_id instanceof User ? $user_id : User::query()->findOrFail($user_id);
        return [
            "ternobomate" => $this->checkTernoboMate($user->id),
            "ternobopartner" => $this->monitizationCheck($user->id),
            "newcommer" => $this->checkNewCommer($user, $page),
            "visitor" => $this->checkVisitor($page instanceof Page ? $page : $user->id),
        ];
    }

    private function checkVisitor($user_id)
    {
        $page = $user_id instanceof Page ? $user_id : User::query()->findOrFail($user_id)->personalPage;
        return !$page->visible;
    }

    private function monitizationCheck($user_id)
    {
        return Partner::query()->where("user_id", $user_id)->exists();
    }

    private function checkNewCommer($user, $page = null)
    {
        $page = $page instanceof Page ? $page : $user->personalPage;
        $carbon = new Carbon();
        $now = $carbon->now();
        return ($now->timestamp - $user->created_at->timestamp) < (3600 * 24 * 14) && $page->visible;
    }

    private function checkTernoboMate($user_id)
    {
        return Ternobomate::query()->where("user_id", $user_id)->exists();
    }
}
