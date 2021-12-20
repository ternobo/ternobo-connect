<?php

namespace App\Services\Connection;

use App\Models\Following;
use App\Models\Page;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class SuggestionService
{

    private ConnectionsService $connectionsService;

    public function __construct(ConnectionsService $connectionsService)
    {
        $this->connectionsService = $connectionsService;
    }

    private function getSuggestionsForVisitor(Page $page)
    {
        return Page::query()
            ->where("id", "!=", $page->id)
            ->whereRaw("`pages`.`id` NOT IN (SELECT `following` FROM `followings` WHERE `page_id` = ?)", $page->id)
            ->orderByRaw("RAND()")
            ->limit(3)
            ->get();
    }

    private function getSuggestionsForUser(Page $page)
    {

        $randomFollowingIds = collect(DB::select("SELECT `following` FROM `followings` WHERE `page_id` = ? and `type` = 'user' ORDER BY RAND() LIMIT 3", [$page->id]))->pluck("following");
        $randomFollowingIdsPlaceholders = implode(",", array_fill(0, count($randomFollowingIds), '?'));
        $randomFollowersIds = collect(DB::select("SELECT `following` FROM `followings` WHERE `page_id` IN ($randomFollowingIdsPlaceholders) and `type` = 'user' ORDER BY RAND() LIMIT 3", $randomFollowingIds->toArray()))->pluck("following");
        $pages = Page::query()
            ->where("id", "!=", $page->id)
            ->whereIn("id", $randomFollowersIds)
            ->get();

        if (count($pages) >= 3) {
            return $pages;
        }

        return $this->getSuggestionsForVisitor($page);
    }

    public function getRandomFollowing($number = 3)
    {
        Following::query()
            ->distinct("pages.id")
            ->join("pages", "pages.id", "=", "followings.following")
            ->whereRaw("followings.page_id IN (SELECT following from followings where page_id='$user->id')")
            ->whereRaw("followings.following NOT IN (SELECT following from followings where page_id='$user->id')")
            ->where("pages.user_id", "!=", $user->id)
            ->select(["pages.*"])
            ->get()
            ->pluck("page");
    }

    public function getSuggestions(User $user)
    {
        $pages = [];
        if ($user->personalPage->visible) {
            $pages = $this->getSuggestionsForUser($user->personalPage);
        } else {
            $pages = $this->getSuggestionsForVisitor($user->personalPage);
        }

        if ($user->personalPage->visible) {
            $result = [];
            foreach ($pages as $page) {
                if (!(($this->connectionsService->isFollowing($user->id, $page->user_id)) || ($this->connectionsService->isConnected($user->id, $page->user_id)))) {
                    $result[] = $page;
                }
            }
            return $result;
        }

        return $pages;
    }
}
