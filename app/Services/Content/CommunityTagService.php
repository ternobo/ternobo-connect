<?php

namespace App\Services\Content;

use App\Models\CommunityTag;
use App\Models\Page;
use App\Services\ServiceAccess;
use App\Models\Post;
use Illuminate\Support\Facades\DB;

class CommunityTagService extends ServiceAccess
{

    public function __construct()
    {
        parent::__construct();
        $this->isAuthrequired = false;
    }

    public  function getServiceName(): string
    {
        return "ternobo-data/api/v1/community-tags";
    }

    public function getRelatedTags(string $hashtag)
    {
        $response = $this->createRequest()->get($hashtag);
        abort_unless($response->ok(), 503);
        return $response->json();
    }

    public function processHashtag($hashtag)
    {
        $response = $this->createRequest()->withBody(["hashtags" => $hashtag, "delay" => 10], "application/json")->post("/process");
        abort_unless($response->ok(), 503);
        return $response->json();
    }

    public function getCommunityByHashtag(string $hashtag)
    {
        return CommunityTag::query()->whereHas("tag", function ($query) use ($hashtag) {
            return $query->where("name", $hashtag);
        })->first();
    }

    public function addRelatedHashtags(array $hashtags)
    {
        $response = $this->createRequest()->withBody(json_encode(["hashtags" => $hashtags]), "application/json")->post("/");
        abort_unless($response->ok(), 503);
        return $response->json();
    }

    public function deleteRelatedHashtag(array $hashtags)
    {
        $response = $this->createRequest()->withBody(json_encode(["hashtags" => $hashtags]), "application/json")->delete("/");
        abort_unless($response->ok(), 503);
        return $response->json();
    }

    public function getHashtagTopUsers($tag)
    {
        $pages_id = Post::query()
            ->selectRaw("COUNT(`page_id`) as `post_count`, `page_id`")
            ->whereRelation("tags", "name", "=", $tag)
            ->groupBy("page_id")
            ->orderBy("post_count")
            ->get()
            ->pluck("page_id");
        return Page::query()->whereIn("id", $pages_id)->get();
    }
}
