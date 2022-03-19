<?php

namespace App\Services\Community;

use App\Models\CommunityTag;
use App\Services\RestfulService;

class CommunityExploreService extends RestfulService
{
    public function getCommunities(CommunitySortQuery $sort, ?string $category_id = null, ?string $search = null)
    {
        $query = CommunityTag::query();
        if ($category_id != null) {
            $query = $query->whereRelation("communityCategory", "id", "=", $category_id);
        }
        if ($search != null) {
            $query = $query->whereRelation("tag", "name", "LIKE", "%" . $search . "%");
        }

        $query = $sort->getSortQuery($query->select("community_tags.*"));

        return  $query->paginate(20);
    }
}
