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

    public function getHashtagTopUsers($tag)
    {
        $data = DB::select("select COUNT(page_id) as post_count, page_id from posts where json_contains(`tags`,'\"$tag\"') and deleted_at is NULL group by page_id order by post_count DESC limit 5");
        $pages_id = array_column($data, "page_id");
        return Page::query()->whereIn("id", $pages_id)->get();
    }
}
