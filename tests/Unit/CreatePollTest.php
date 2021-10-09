<?php

namespace Tests\Unit;

use App\Services\Poll\PollModel;
use App\Services\Poll\PollService;
use PHPUnit\Framework\TestCase;

use function PHPUnit\Framework\assertEquals;
use function PHPUnit\Framework\assertIsArray;
use function PHPUnit\Framework\assertTrue;

class CreatePollTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_create()
    {
        $pollSerivce = new PollService();
        $pollQuestion = "Hi This is Test Question";
        $pollOptions = [
            ["text" => "Hi"],
            ["text" => "Option 2"],
        ];
        $poll = $pollSerivce->createPoll(new PollModel(1, $pollQuestion, $pollOptions, null));

        assertTrue($poll instanceof PollModel);
        assertTrue(isset($poll->id));
        assertEquals($pollQuestion, $poll->question);
        assertIsArray($poll->options);
    }
}
