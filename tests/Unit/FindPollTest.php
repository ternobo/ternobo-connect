<?php

namespace Tests\Unit;

use App\Services\Poll\PollModel;
use App\Services\Poll\PollService;
use PHPUnit\Framework\TestCase;

use function PHPUnit\Framework\assertTrue;

class FindPollTest extends TestCase
{
    /**
     * A find poll test
     *
     * @return void
     */
    public function test_findPoll()
    {
        $pollSerivce = new PollService();
        $poll = $pollSerivce->findById(1);

        assertTrue(
            $poll instanceof PollModel
        );
    }
}
