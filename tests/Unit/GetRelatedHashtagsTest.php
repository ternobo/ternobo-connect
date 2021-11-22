<?php

namespace Tests\Unit;

use App\Services\Content\CommunityTagService;
use PHPUnit\Framework\TestCase;

class GetRelatedHashtagsTest extends TestCase
{


    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_related_tags()
    {
        $service = new CommunityTagService();
        $relatedTags = $service->getRelatedTags("vel");
        print_r($relatedTags);
        $this->assertTrue($relatedTags['status']);
        $this->assertIsArray($relatedTags['data']);
    }
}
