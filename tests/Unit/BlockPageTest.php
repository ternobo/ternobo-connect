<?php

namespace Tests\Unit;

use App\Models\BlockedPage;
use App\Models\Page;
use App\Models\User;
use Illuminate\Foundation\Testing\TestCase;
use Tests\CreatesApplication;

class BlockPageTest extends TestCase
{

    use CreatesApplication;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::find(1);
    }

    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_canBlockPage()
    {
        $this->actingAs(User::find(1));
        $randomPageId = Page::all()->random()->id;
        BlockedPage::blockPage($randomPageId);
        $this->assertTrue(true);
        $this->assertTrue(Page::find($randomPageId)->isBlockedByMe());
        $this->assertTrue(BlockedPage::unblockPage($randomPageId));
    }
}
