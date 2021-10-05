<?php

namespace Tests\Feature;

use App\Models\User;
use Tests\TestCase;

class BlockedListTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_blockedList()
    {
        $user = User::find(1);
        $this->actingAs($user);
        $this->assertAuthenticated();
    }
}
