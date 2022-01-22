<?php

use App\Models\SocialDriver;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddRedditDriver extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        SocialDriver::create([
            'driver' => "reddit",
            'icon' => "/images/socials/reddit.svg",
            'name' => "Reddit",
            'link' => "https://www.reddit.com/user/",
            'active' => true,
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
