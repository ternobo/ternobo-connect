<?php

namespace App\Services;

use App\Models\Like;
use App\Models\MonitizationRequest;
use App\Models\Page;
use App\Models\Partner;
use App\Models\Post;
use App\Models\Ternobomate;
use App\Models\User;

/**
 * Monitization conditions
 * 
 * - Share posts: 2
 * - Get likes by Signed up users: 6
 * - Enable two-step authentication
 * - Get likes by Visitor users: 250
 * 
 */
class MonitizationService extends RestfulService
{

    public function sendMonitizationRequest(User $user)
    {
        return $this->getMonitizationStatus($user) ? MonitizationRequest::create([
            "user_id" => $user->id
        ]) : null;
    }

    public function canAccessMonitization(User $user)
    {
        return Partner::query()->where("user_id", $user->id)->exists() || Ternobomate::query()->where('user_id', $user->id)->exists();
    }

    public function getMonitizationStatus(User $user)
    {
        $personalPageId = $user->personalPage->id;
        $sharedPostsStatus = $this->checkSharedPosts($personalPageId);
        $visitorLikesStatus = $this->checkVisitorUsersLikes($personalPageId);
        $userLkesStatus = $this->checkSignupUsersLikes($personalPageId);
        $twofactorauthStatus = $this->check2FAEnabled($user);

        $items = [
            $sharedPostsStatus,
            $visitorLikesStatus,
            $userLkesStatus,
            $twofactorauthStatus
        ];

        $numberOfTrue = 0;
        foreach ($items as $item) {
            if ($item['status']) {
                $numberOfTrue++;
            }
        }

        $percent = ($numberOfTrue / count($items)) * 100;

        return [
            "status" => $sharedPostsStatus['status'] && $visitorLikesStatus['status'] && $userLkesStatus['status'] && $twofactorauthStatus['status'],
            "last_request" => $this->getLastMonitizationRequest($user),
            "items" => $items,
            "percent" => $percent
        ];
    }

    public function getLastMonitizationRequest(User $user)
    {
        return MonitizationRequest::query()->where("user_id", $user->id)->latest()->first();
    }

    public function checkSharedPosts($personalPageId)
    {
        $sharedPosts = Post::query()->where("page_id", $personalPageId)->count();
        return  [
            "id" => "monitization.min-posts",
            'status' => $sharedPosts >= config("monitization.min-posts"),
            "text" => __("monitization.shared-posts"),
            "indicator" => "$sharedPosts/" . "<span class='text-gray'>" . config("monitization.min-posts") . "</span>",
        ];
    }

    public function checkSignupUsersLikes($personalPageId)
    {
        $likes = Like::query()
            ->whereHas("post", function ($query) use ($personalPageId) {
                return $query->where("id", $personalPageId);
            })
            ->whereHas("page", function ($query) use ($personalPageId) {
                return $query->where("visible", true);
            })
            ->count();
        return [
            "id" => "monitization.min-user-likes",
            'status' => $likes >= config("monitization.min-user-likes"),
            "text" => __("monitization.signed-up-user-likes"),
            "indicator" => "$likes/" . "<span class='text-gray'>" . config("monitization.min-user-likes") . "</span>",
        ];
    }

    public function checkVisitorUsersLikes($personalPageId)
    {
        $likes = Like::query()
            ->whereHas("post", function ($query) use ($personalPageId) {
                return $query->where("id", $personalPageId);
            })
            ->whereHas("page", function ($query) use ($personalPageId) {
                return $query->where("visible", false);
            })
            ->count();
        return [
            "id" => "monitization.min-visitor-likes",
            'status' => $likes >= config("monitization.min-visitor-likes"),
            "text" => __("monitization.visitor-likes"),
            "indicator" => "$likes/" . "<span class='text-gray'>" . config("monitization.min-visitor-likes") . "</span>",
        ];
    }

    public function check2FAEnabled(User $user)
    {
        $status = config("monitization.2fa-required") ? $user->two_factor : true;
        return [
            "id" => "monitization.2fa-required",
            'status' => $status,
            "text" => __("monitization.2fa"),
            'indicator' => $status ? null : "href=/settings?modal=showTwoFAModal"
        ];
    }
}
