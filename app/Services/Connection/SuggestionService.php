<?php

namespace App\Services\Connection;

use App\Models\Following;
use App\Models\Page;
use App\Models\User;

class SuggestionService
{


    private function getSuggestionsForVisitor(User $user)
    {
        return Page::query()
            ->distinct("pages.id")
            ->where("pages.user_id", "!=", $user->id)
            ->get()->random(3);
    }

    private function getSuggestionsForUser(User $user)
    {
        $pages = Following::query()
            ->distinct("pages.id")
            ->join("pages", "pages.id", "=", "followings.following")
            ->whereRaw("followings.page_id IN (SELECT following from followings where page_id='$user->id')")
            ->whereRaw("followings.following NOT IN (SELECT following from followings where page_id='$user->id')")
            ->where("pages.user_id", "!=", $user->id)
            ->select(array("pages.*"))
            ->get();

        if (count($pages) > 3) {
            return $pages->random(3);
        }
        return $this->getSuggestionsForVisitor($user);
    }

    public function getSuggestions(User $user)
    {
        $pages = [];
        if ($user->personalPage->visible) {
            $pages = $this->getSuggestionsForUser($user);
        } else {
            $pages = $this->getSuggestionsForVisitor($user);
        }

        if ($user->personalPage->visible) {
            $result = [];
            foreach ($pages as $page) {
                if (!(($user->isFollowing($page->user_id) instanceof Following) || ($user->isConnected($page->user_id) instanceof \App\Model\Connection))) {
                    $result[] = $page;
                }
            }
            return $result;
        }

        return $pages;
    }
}
