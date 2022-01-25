<?php

namespace Database\Seeders;

use App\Models\CommunityCategory;
use App\Models\CommunityTag;
use App\Models\Tag;
use Illuminate\Database\Seeder;

class CommunityTagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $communityCategoris = CommunityTag::factory()
            ->for(
                CommunityCategory::factory(),
                "category"
            )
            ->for(
                Tag::factory()
            )
            ->count(100)
            ->make();
        foreach ($communityCategoris as $communityCategory) {
            $communityCategory->tag->save();
            $communityCategory->category->save();
            $communityCategory->community_category_id = $communityCategory->category_id;
            unset($communityCategory->category_id);
            $communityCategory->save();
        }
    }
}
