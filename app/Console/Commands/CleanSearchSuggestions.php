<?php

namespace App\Console\Commands;

use App\Models\Page;
use App\Models\Post;
use App\Models\SearchSuggestion;
use Illuminate\Console\Command;

class CleanSearchSuggestions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'search:clean';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete Search Suggestions with zero result';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    private function generateSearch($search)
    {
        $first = true;
        $result = "";
        $replaces = array("+" => "", "-" => "", ">" => "", "<" => "", "(" => "", ")" => "", "~" => "", "*" => "", "“" => "", "”" => "", "\"" => "", "\"" => "", "ا" => "+ا*" . " +آ*");
        foreach ($search as $keyword) {
            foreach ($replaces as $key => $value) {
                //     echo $key;
                $keyword = str_replace(mb_convert_encoding($value, 'UTF-8'), $key, $keyword);
            }

            if ($first) {
                $result .= "+$keyword*";
                $first = false;
            } else {
                $result .= " +$keyword*";
            }
        }
        return $result;
    }

    private function handleGetSearch($searchQuery)
    {
        $search = $this->generateSearch(explode(" ", $searchQuery));
        $results = 0;
        $results = Post::withRelations()
            ->with(["page", "content" => function ($query) use ($search) {
                $query->selectRaw("MATCH (`content`) AGAINST(? IN BOOLEAN MODE) as score", [$search])
                    ->orderBy("score");
            }, "mutualLikes", "category"])
            ->selectRaw("MATCH (`title`, `text`) AGAINST(? IN BOOLEAN MODE) as score, posts.*", [$search])
            ->whereRaw("MATCH (`title`, `text`) AGAINST(? IN BOOLEAN MODE) > 0", [$search])
            ->orWhereHas("content", function ($query) use ($search) {
                $query->whereRaw("MATCH (`content`) AGAINST(? IN BOOLEAN MODE) > 0", [$search]);
            })
            ->orWhereRelation("tags", "name", "=", $search)
            ->orderBy("score")
            ->distinct("posts.id")
            ->count();

        $results += Page::query()
            ->leftJoin("skills", "skills.user_id", "pages.user_id")
            ->selectRaw("MATCH (pages.name,short_bio,about,slug,location) AGAINST(? IN BOOLEAN MODE) as score, pages.*", [$search])
            ->where(function ($query) use ($search, $searchQuery) {
                $query->whereRaw("MATCH (pages.name,short_bio,about,slug,location) AGAINST(? IN BOOLEAN MODE) > 0", [$search]);
                $query->orWhereRaw("skills.name like ?", ['%' . $searchQuery . '%']);
            })
            ->orderBy("score")
            ->distinct("pages.id")
            ->whereHas("user", function ($query) {
                return $query->where("active", true);
            })->count();
        return $results;
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $count = 0;
        $searchSuggestions = SearchSuggestion::all();
        foreach ($searchSuggestions as $searchSuggestion) {
            if ($this->handleGetSearch($searchSuggestion) < 1) {
                $searchSuggestion->delete();
                $count++;
            }
        }
        $this->info("$count Search Suggestion Deleted");
    }
}
