<?php

namespace App\Services\Connection;

use App\Models\CommunityTag;
use App\Models\Following;
use App\Models\Page;
use App\Models\User;
use App\Ternobo;
use Illuminate\Support\Facades\Auth;
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
        $pages = Page::query()
            ->where("id", "!=", $page->id)
            ->whereRaw("`pages`.`id` NOT IN (SELECT `following` FROM `followings` WHERE `page_id` = ?)", $page->id)
            ->orderByRaw("RAND()")
            ->where("visible", true)
            ->limit(2)
            ->get();

        $communityTags = CommunityTag::query()
            ->whereHas("tag", function ($query) use ($page) {
                return $query->whereRaw("`tags`.`id` NOT IN (SELECT `following` FROM `followings` WHERE `page_id` = ? AND type = ?)", [$page->id, "tag"]);
            })
            ->orderByRaw("RAND()")
            ->limit(1)
            ->get();

        return $pages->merge($communityTags)
            ->map(function ($item) {
                $item['type'] = $item instanceof Page ? "page" : "tag";
                return $item;
            })
            ->unique("id")
            ->shuffle();
    }


    public function getSuggestionsBaseOnPage(Page $page)
    {
        $randomFollowingIds = collect(DB::select("SELECT `following` FROM `followings` WHERE `page_id` = ? AND `type` = 'user' ORDER BY RAND() LIMIT 2", [$page->id]))->pluck("following");

        $randomTagFollowingId = collect(DB::select("SELECT `following` FROM `followings` WHERE `page_id` = ? AND `type` = 'tag' ORDER BY RAND() LIMIT 2", [$page->id]))->pluck("following")->first();

        $communityTags = CommunityTag::query()
            ->with(["tag"])
            ->where("tag_id", $randomTagFollowingId)
            ->orderByRaw("RAND()")
            ->limit(1)
            ->get();

        return Page::query()
            ->whereIn("id", $randomFollowingIds)
            ->where("id", "!=", $page->id)
            ->orderByRaw("RAND()")
            ->limit(3)
            ->get()
            ->merge($communityTags)
            ->map(function ($item) {
                $item['type'] = $item instanceof Page ? "page" : "tag";
                if (Auth::check()) {
                    $item['is_followed'] = Ternobo::currentPage() ?
                        Following::withTags()->where("page_id", Ternobo::currentPage()->id)->where("following", $item['type'] == "tag" ? $item['tag_id'] : $item['id'])->exists() : false;
                }
                return $item;
            })
            ->unique("id")
            ->shuffle();
    }

    private function getSuggestionsForUser(Page $page)
    {
        $randomFollowingIds = collect(DB::select("SELECT `following` FROM `followings` WHERE `page_id` = ? ORDER BY RAND() LIMIT 3", [$page->id]))->pluck("following");

        $suggestions = collect(Following::query()
            ->whereIn("page_id", $randomFollowingIds)
            ->whereHas("page", function ($query) use ($page) {
                return $query->whereRaw("`pages`.`id` NOT IN (SELECT `following` FROM `followings` WHERE `page_id` = ?)", $page->id)->where("id", "!=", $page->id);
            })
            ->orderByRaw("RAND()")
            ->limit(3)
            ->get()
            ->toArray())
            ->reject(function ($item) {
                $item['type'] == "tag" && !CommunityTag::query()->where("tag_id", $item['following']['id'])->exsits();
            })
            ->map(function ($item) {
                if ($item['type'] == "tag") {
                    $item = CommunityTag::query()->where("tag_id", $item['following']['id'])->first();
                    $item['following']['type'] = "tag";
                } else {
                    $item['following']['type'] = "page";
                }
                return $item;
            })
            ->pluck("following")
            ->unique("id");

        if (count($suggestions) >= 3) {
            return $suggestions;
        }

        return $this->getSuggestionsForVisitor($page);
    }

    public function getSuggestions(User $user)
    {
        $pages = [];
        if ($user->personalPage->visible) {
            $pages = $this->getSuggestionsForUser($user->personalPage);
        } else {
            $pages = $this->getSuggestionsForVisitor($user->personalPage);
        }

        return $pages;
    }
}
