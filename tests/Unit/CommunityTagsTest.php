<?php

namespace Tests\Unit;

use App\Models\Tag;
use App\Services\Content\CommunityTagService;
use PHPUnit\Framework\TestCase;

class CommunityTagsTest extends TestCase
{

    private CommunityTagService $service;

    public function setUp(): void
    {
        parent::setUp();
        $this->service = resolve(CommunityTagService::class);
    }

    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_top_users()
    {
        $tag = Tag::all()->random();
        $topUsers = $this->service->getHashtagTopUsers($tag);
        print_r($topUsers);
    }
}
