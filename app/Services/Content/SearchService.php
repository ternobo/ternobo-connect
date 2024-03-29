<?php

namespace App\Services\Content;

use App\Http\Resources\BaseResource;
use App\Http\Resources\Search\TagSearchResource;
use App\Models\Page;
use App\Models\Post;
use App\Models\SearchSuggestion;
use App\Models\Tag;
use App\Services\RestfulService;

class SearchService extends RestfulService
{
    public function generateSearchQeury(mixed $search): string
    {
        $first = true;
        $result = "";
        $replaces = array("ـ" => "_");
        foreach ($search as $keyword) {
            foreach ($replaces as $key => $value) {
                $keyword = str_replace($key, mb_convert_encoding($value, 'UTF-8'), $keyword);
            }
            $search = preg_replace('/[+\-><\(\)~*\"@#]+/', ' ', preg_replace('/[^\p{L}\p{N}_]+/u', ' ', $keyword));
            if ($first) {
                $result .= "+$search*";
                $first = false;
            } else {
                $result .= " +$search*";
            }
        }
        return $result;
    }

    public function searchForPages($search)
    {
        $querySearch = $this->generateSearchQeury(explode(" ", $search));
        return Page::query()
            ->leftJoin("skills", "skills.user_id", "pages.user_id")
            ->selectRaw("MATCH (pages.name,short_bio,about,slug,location) AGAINST(? IN BOOLEAN MODE) as score, pages.*", [$querySearch])
            ->where(function ($query) use ($search, $querySearch) {
                return $query->whereRaw("MATCH (pages.name,short_bio,about,slug,location) AGAINST(? IN BOOLEAN MODE) > 0", [$querySearch])
                    ->orWhereRaw("skills.name like ?", ['%' . $search . '%']);
            })
            ->where("visible", true)
            ->orderBy("score")
            ->distinct("pages.id")
            ->paginate(20);
    }

    public function searchForContent($search)
    {
        $querySearch = $this->generateSearchQeury(explode(" ", $search));
        return Post::with(["page", "slides.content" => function ($query) use ($querySearch) {
            return $query->selectRaw("slide_blocks.*, MATCH (`content`) AGAINST(? IN BOOLEAN MODE) as score", [$querySearch])
                ->orderBy("score", "DESC");
        }, "mutualLikes", "category"])
            ->selectRaw("MATCH (`title`, `text`) AGAINST(? IN BOOLEAN MODE) as score, posts.*", [$querySearch])
            ->where(function ($query) use ($search, $querySearch) {
                return $query->whereRaw("MATCH (`title`, `text`) AGAINST(? IN BOOLEAN MODE) > 0", [$querySearch])
                    ->orWhereHas("slides.content", function ($query) use ($querySearch) {
                        return $query->whereRaw("MATCH (`content`) AGAINST(? IN BOOLEAN MODE) > 0", [$querySearch]);
                    })
                    ->orWhereRelation("tags", "name", "=", $search);
            })
            ->distinct("posts.id")
            ->paginate(20);
    }

    public function searchForTags($search)
    {
        return Tag::query()
            ->where("name", "LIKE", "%$search%")
            ->where(function ($query) {
                return $query->whereHas("posts")->orWhereHas("community");
            })
            ->orWhereHas("community", function ($query) use ($search) {
                return $query->whereRelation("transactions", "translation", "LIKE", "%$search%");
            })
            ->paginate(20);
    }

    public function suggestForSearchAutoComplete($search)
    {
        $result = array();
        $suggestions = SearchSuggestion::query()->whereRaw("name like ?", ['%' . $search . '%'])->limit(5)->get();
        foreach ($suggestions as $value) {
            $result[] = $value->name;
        }
        return $result;
    }
}
