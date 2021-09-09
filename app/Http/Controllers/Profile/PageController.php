<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use App\Models\Action;
use App\Models\Category;
use App\Models\Contact;
use App\Models\Following;
use App\Models\Page;
use App\Models\Post;
use App\Models\Report;
use App\Models\Website;
use App\Ternobo;
use Artesaos\SEOTools\Facades\SEOMeta;
use Artesaos\SEOTools\Facades\SEOTools;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Ternobo\TernoboWire\TernoboWire;

class PageController extends Controller
{

    public function show($page, $location = "home", Request $request)
    {
        $page = Page::query()
            ->with("aboutData")
            ->with("contactData")
            ->with("categories")
            ->with("skills")
            ->where("slug", $page)
            ->firstOrFail();

        if ($page->user->active) {
            if ($page->type === "company") {
                return view("company-profile", array("page" => $page));
            } else {
                return $this->handlePersonalProfile($page, $location, $request);
            }
        }
        return abort(404);
    }

    public function getCategory($page, $category, $location = "activities", Request $request)
    {
        $page = Page::query()
            ->with("categories")
            ->with("education")
            ->with("expreciences")
            ->with("user.skills")
            ->with("achievements")
            ->where("slug", $page)
            ->firstOrFail();
        if ($page->user->active) {
            if ($page->type === "company") {
                return view("company-profile", array("page" => $page));
            } else {
                return $this->handlePersonalProfile($page, $location, $request, $category);
            }
        }
        return abort(404);
    }

    public function handlePersonalProfile(Page $page, $location = "home", Request $request, $category = null)
    {
        if (Auth::check() && $page->isBlockedMe()) {
            return abort(404);
        }

        SEOTools::setTitle($page->name);
        $page->load("user.invitedBy");
        if ($page->about !== null && $page->about !== "") {
            SEOTools::setDescription($page->about);
        } else {
            SEOTools::setDescription("پروفایل کاربر $page->name در ترنوبو");
        }

        SEOTools::opengraph()->setUrl(url("/" . $page->slug));
        SEOTools::setCanonical(url("/" . $page->slug));
        SEOTools::opengraph()->addProperty('type', 'profile');
        SEOTools::opengraph()->addProperty('profile:first_name', $page->user->first_name);
        SEOTools::opengraph()->addProperty('profile:last_name', $page->user->last_name);
        SEOTools::opengraph()->addProperty('profile:username', $page->slug);
        SEOTools::jsonLd()->addImage($page->profile);
        SEOMeta::addKeyword(['پروفایل' . $page->name, $page->name, $page->user->first_name, $page->user->last_name]);

        $pages = array();
        if (Auth::check()) {
            $pages = Following::where("followings.page_id", $page->id)
                ->join("pages", "pages.id", "=", "followings.following")
                ->where("pages.id", "!=", $page->id)
                ->where("pages.id", "!=", Auth::user()->getPage()->id)
                ->get();
            $pages = count($pages) > 3 ? $pages->random(3) : $pages;
        }

        $actions = $page->getActions(null, 5);

        $hasAbout = ($page->aboutData != null && count((array) $page->aboutData) > 0) || ($page->about != null && $page->about != "") || count($page->user->skills) > 0;
        $hasActivity = !($actions == null || count($actions) < 1);

        if (!$hasAbout) {
            $location = "activities";
        }
        if (!$hasActivity) {
            $location = "contact";
        }

        return TernoboWire::render(
            "Profiles/UserProfile",
            [
                "page" => $page,
                "pages" => $pages,
                "location" => $location,
                'currentCategory' => $category,

                'hasActivity' => $hasActivity,
                'hasAbout' => $hasAbout,
            ]
        );
    }

    public function getTags(Page $page, Request $request)
    {
        $posts = Post::query()->where("page_id", $page->id);

        if ($request->filled("category")) {
            $posts = $posts->where("category_id", $request->category);
        }

        $posts = $posts->get();

        $tags = [];

        foreach ($posts as $post) {
            $postTags = $post->tags;
            $postTags = $postTags == null ? [] : $postTags;
            $tags = array_merge($tags, $postTags);
        }

        $tagsOrdered = [];

        $tags = array_count_values($tags);

        arsort($tags);

        return response()->json([
            'tags' => array_keys($tags),
        ]);
    }

    public function removeTags(Request $request)
    {
        $tags = $request->tags;
        foreach ($tags as $tag) {
            $posts = Post::query()->where("page_id", Auth::user()->personalPage->id)
                ->whereJsonContains("tags", $tag)
                ->get();
            foreach ($posts as $post) {
                $postTags = $post->tags;

                $index = array_search($tag, $postTags);
                if (!is_bool($index)) {
                    unset($postTags[$index]);
                }
                $post->tags = json_encode(array_values($postTags));
                $post->save();
            }
        }
        return response()->json([
            "result" => true,
        ]);
    }

    public function getActions(Page $page, Request $request)
    {
        $actions = ["data" => [], "next_page_url" => null];

        if ($request->filled("category")) {
            $actions = Action::query()->where("page_id", $page->id)
                ->with("post")
                ->with("post.page")

                ->with("post.category")
                ->where("action", "post")
                ->whereHas("post", function ($query) use ($request) {
                    $category = $request->category;
                    $query->where("category_id", $category);
                    if ($request->filled("tag")) {
                        $query->whereJsonContains("tags", $request->tag);
                    }
                })
                ->latest();

            if (Auth::check()) {
                $actions = $actions->with("post.mutualLikes");
            }

            $actions = $actions->paginate(10);
        } elseif ($request->filled("tag")) {
            $actions = Action::query()->where("page_id", $page->id)
                ->with("post")
                ->with("post.page")
                ->with("post.category")
                ->where("action", "post")
                ->whereHas("post", function ($query) use ($request) {
                    $query->whereJsonContains("tags", $request->tag);
                })
                ->latest();

            if (Auth::check()) {
                $actions = $actions->with("post.mutualLikes");
            }

            $actions = $actions->paginate(10);
        } elseif ($request->filled("action")) {
            if (Str::startsWith($request->action, "like")) {
                $actions = $page->getActions("like", 10);
            } elseif (Str::startsWith($request->action, "share")) {
                $actions = $page->getActions("share", 10);
            } elseif (Str::startsWith($request->action, "comment")) {
                $actions = $page->getActions("comment", 10);
            } elseif (Str::startsWith($request->action, "all")) {
                $actions = $page->getActions("post", 10);
            }
        }

        return response()->json([
            'actions' => $actions,
        ]);
    }

    public function showPage($page)
    {

        $page = Page::query()
            ->with("skills")
            ->with("categories")
            ->where("slug", $page)->firstOrFail();

        $page->profile_steps = $page->user->getProfileSteps();

        SEOTools::setTitle($page->name);
        if ($page->about !== null && $page->about !== "") {
            SEOTools::setDescription($page->about);
        } else {
            SEOTools::setDescription("پروفایل کاربر $page->name در ترنوبو");
        }

        SEOTools::opengraph()->setUrl(url("/" . $page->slug));
        SEOTools::setCanonical(url("/" . $page->slug));
        SEOTools::opengraph()->addProperty('type', 'profile');
        SEOTools::opengraph()->addProperty('profile:first_name', $page->user->first_name);
        SEOTools::opengraph()->addProperty('profile:last_name', $page->user->last_name);
        SEOTools::opengraph()->addProperty('profile:username', $page->slug);
        SEOTools::jsonLd()->addImage($page->profile);
        SEOMeta::addKeyword(['پروفایل' . $page->name, $page->name, $page->user->first_name, $page->user->last_name]);
        return TernoboWire::render("Profile/UserProfile", [
            "page" => $page,
            "SEOMeta" => SEOTools::generate(),
        ]);
    }

    public function search(Request $request)
    {
        $results = array();
        $page = Ternobo::currentPage();
        $suggestions = Page::query()
            ->whereRaw("slug like ?", ['%' . $request->q . '%'])
            ->orWhereRaw("name like ?", ['%' . $request->q . '%'])
            ->leftJoinSub(Following::query()->where("page_id", $page->id), "followings", function ($join) {
                $join->on('followings.following', '=', 'pages.id');
            })
            ->limit(10)
            ->orderByRaw("followings.created_at DESC")
            ->select(['pages.*'])
            ->get();
        // dd($suggestions->toArray());
        foreach ($suggestions as $value) {
            $result = array();
            $result["key"] = $value->slug;
            $result["value"] = $value->slug;
            $result["name"] = $value->name;

            $results[] = $result;
        }
        return response()->json(array("result" => true, "pages" => $results));
    }

    public function saveWebsits(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "option" => "required|max:6",
        ]);
        if ($validator->fails()) {
            return response()->json(array("result" => false, "errors" => $validator->errors()));
        } else {
            $options = $request->input("option");
            $page = Auth::user()->getPage();
            $result = true;
            foreach ($options as $option) {
                $option = (object) $option;
                Website::where("page_id", $page->id)->where("option_id", $option->key)->delete();
                $result = Website::setOption($option->key, $option->value, $page->id);
            }
            return response()->json(array("result" => $result));
        }
    }

    public function saveContacts(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "option" => "required|max:6",
        ]);
        if ($validator->fails()) {
            return response()->json(array("result" => false, "errors" => $validator->errors()));
        } else {
            $options = $request->input("option");
            $page = Auth::user()->getPage();
            $result = true;
            Contact::where("page_id", $page->id)->delete();
            foreach ($options as $option) {
                $option = (object) $option;
                Contact::where("page_id", $page->id)->where("option_id", $option->key)->delete();
                $result = Contact::setOption($option->key, $option->value, $page->id);
            }
            return response()->json(array("result" => $result));
        }
    }

    public function getDrafts($page, Request $request)
    {
        $drafts = Post::withDrafts()->where(function ($query) {
            $query->where('type', '=', "draft_post")->orWhere('type', '=', "draft_article");
        })->where("page_id", Auth::user()->personalPage->id)->paginate();
        return response()->json(['result' => true, 'drafts' => $drafts]);
    }

    public function saveProfile(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "firstname" => "required",
            "lastname" => "required",
            "gender" => "required",
        ], [], ["gender" => __('validation.attributes.sex'), 'firstname' => __("validation.attributes.first-name"), "lastname" => __("validation.attributes.last-name")]);
        if ($validator->fails()) {
            return response()->json(array("result" => false, "errors" => $validator->errors()));
        } else {
            $page = Auth::user()->getPage();
            $page->name = $request->firstname . " " . $request->lastname;
            if ($request->has("location")) {
                $page->location = $request->location;
            }
            $user = Auth::user();
            $user->first_name = $request->firstname;
            $user->last_name = $request->lastname;
            $user->gender = $request->gender;

            if ($request->has("short_bio")) {
                $page->short_bio = $request->short_bio;
                $user->short_bio = $request->short_bio;
            }

            if ($request->has("about")) {
                $page->about = $request->about;
            }

            return response()->json(array("result" => $user->save() && $page->save()));
        }
    }

    public function saveBio(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "value" => "required",
        ]);
        if ($validator->fails()) {
            return response()->json(array("result" => false, "errors" => $validator->errors()));
        } else {
            $page = Auth::user()->getPage();
            $page->about = $request->value;
            return response()->json(array("result" => $page->save()));
        }
    }

    public function saveShortBio(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "value" => "required",
        ]);
        if ($validator->fails()) {
            return response()->json(array("result" => false, "errors" => $validator->errors()));
        } else {
            $page = Auth::user()->getPage();
            $page->short_bio = $request->value;
            $user = Auth::user();
            $user->short_bio = $request->value;
            return response()->json(array("result" => $user->save() && $page->save()));
        }
    }

    public function saveUsername(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "value" => "required",
        ]);
        if ($validator->fails()) {
            return response()->json(array("result" => false, "errors" => $validator->errors()));
        } else {
            $page = Auth::user()->getPage();
            $page->slug = $request->value;
            $user = Auth::user();
            $user->username = $request->value;
            return response()->json(array("result" => $user->save() && $page->save()));
        }
    }

    public function report(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "page_id" => "required",
            "report" => "required",
        ], [], ['report' => __("validation.attributes.report-reason")]);
        if ($validator->fails()) {
            return response()->json(array("result" => false, "errors" => $validator->errors()));
        } else {
            $report = new Report();
            $report->reportable_id = $request->page_id;
            $report->reportable_type = Page::class;
            $report->reason = $request->report;
            if ($request->filled("moreinfo")) {
                $report->description = $request->moreinfo;
            }
            $report->user_id = Auth::user()->id;
            $report->save();
            return response()->json(array("result" => true, "msg" => "گزارش تخلف شما با موفقیت ثبت شد"));
        }
    }

    public function getMutualFriends(Request $request)
    {
        $page = Page::query()->find($request->page_id);
        $list = $page->mutualFriends();
        $data = [
            "list" => $list,
            "text" => $page->getMutualsText($list),
            "count" => count($list),
        ];
        if ($request->filled('all') && $request->all) {
            $data['list'] = $list;
        }
        return response()->json([
            'result' => true,
            'mutuals' => $data,
        ]);
    }
}
