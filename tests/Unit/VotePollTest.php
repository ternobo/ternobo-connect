<?php

namespace Tests\Unit;

use App\Services\Poll\PollService;
use PHPUnit\Framework\TestCase;

use function PHPUnit\Framework\assertTrue;

class VotePollTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_vote()
    {
        $pollSerivce = new PollService();
        $poll = $pollSerivce->findById(1);
        $optionToVote = $poll->options[0]['id'];
        $voteResponse = $pollSerivce->vote($optionToVote, $poll->id);

        assertTrue($voteResponse['status']);
        
        assertTrue(
            is_array($voteResponse['result']['options']) &&
                gettype($voteResponse['result']['isVoted']) == 'boolean'
        );
    }
}
