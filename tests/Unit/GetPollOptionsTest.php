<?php

namespace Tests\Unit;

use App\Services\Poll\PollService;
use PHPUnit\Framework\TestCase;

use function PHPUnit\Framework\assertTrue;

class GetPollOptionsTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_getPollOptions()
    {
        $pollSerivce = new PollService();
        $response = $pollSerivce->getPollOptions(1);
        assertTrue(
            $response['status']
        );
        assertTrue(
            is_array($response['result'])
        );
    }
}
