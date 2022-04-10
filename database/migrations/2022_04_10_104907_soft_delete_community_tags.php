<?php

use App\Models\CommunityTag;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $communityTags = CommunityTag::query()->get();
        foreach ($communityTags as $communityTag) {
            $communityTag->delete();
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $communityTags = CommunityTag::onlyTrashed()->get();
        foreach ($communityTags as $communityTag) {
            $communityTag->restore();
        }
    }
};
