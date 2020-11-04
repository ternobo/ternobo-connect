<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Contact;
use App\Models\Following;
use App\Models\Page;
use App\Models\PageSocial;
use App\Models\Post;
use App\Models\Social;
use App\Models\Website;
use Artesaos\SEOTools\Facades\SEOMeta;
use Artesaos\SEOTools\Facades\SEOTools;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PageController extends Controller
{

    public function show($page, $location = "home", Request $request)
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

        $pages = array();
        if (Auth::check()) {
            $pages = Following::where("followings.user_id", $page->user->id)
                ->join("pages", "pages.id", "=", "followings.following")
                ->where("pages.id", "!=", $page->id)
                ->where("pages.id", "!=", Auth::user()->getPage()->id)
                ->get();
            if (count($pages) > 5) {
                $pages = $pages->random(5);
            }
        }

        $actions = ["data" => [], "next_page_url" => null];
        if (Str::startsWith($request->action, "like")) {
            $actions = $page->getActions("like", 5);
        } elseif (Str::startsWith($request->action, "share")) {
            $actions = $page->getActions("share", 5);
        } elseif (Str::startsWith($request->action, "comment")) {
            $actions = $page->getActions("comment", 5);
        } elseif ($category !== null) {
            if ($category === "all") {
                $actions = $page->getActions("post", 5);
            } else {
                $actions = $page->getActions("post", 5, $category);
            }
        } else {
            $actions = $page->getActions(null, 5);
        }

        $articles = ["data" => [], "next_page_url" => null];

        if ($location === 'articles') {
            $articles = Post::query()
                ->with("page")
                ->with("likes")

                ->with("category")
                ->where("page_id", $page->id)
                ->where("type", "article");

            if (Auth::check()) {
                $articles = $articles->with("mutualLikes");
            }
            if ($category !== null && $category !== "all") {
                $articles = $articles->where("category_id", $category);
            }
            $articles = $articles->paginate(10);
        }

        return Inertia::render(
            "Profiles/UserProfile",
            [
                "page" => $page,
                "pages" => $pages,
                "actions" => $actions,
                "articles" => $articles,
                "location" => $location,
            ]
        );
    }

    public function getPosts(Request $request)
    {
        $posts = Page::query()
            ->where("slug", $request->page_slug)->firstOrFail()
            ->posts();

        if ($request->exists("category")) {
            $posts = $posts->where("category_id", $request->category);
        }

        return response()->json($posts->paginate(10));
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
        return Inertia::render("Profile/UserProfile", [
            "page" => $page,
            "SEOMeta" => SEOTools::generate(),
        ]);
    }

    public function search(Request $request)
    {
        $results = array();
        $suggestions = Page::query()->whereHas("user", function ($query) {
            $query->where("active", true);
        })->whereRaw("slug like '%$request->q%'")->limit(10)->get();
        foreach ($suggestions as $value) {
            $result = array();
            $result["key"] = $value->slug;
            $result["value"] = $value->slug;
            $results[] = $result;
        }
        return response()->json(array("result" => true, "pages" => $results));
    }

    public function getArticleCategory(Page $page, Category $category, Request $request)
    {
        return $this->getCategory($page, $category, $request);
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

    public function saveSocials(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "option" => "required|max:12",
        ]);
        if ($validator->fails()) {
            return response()->json(array("result" => false, "errors" => $validator->errors()));
        } else {
            $options = $request->input("option");
            $page = Auth::user()->getPage();
            $result = true;
            foreach ($options as $option) {
                $option = (object) $option;
                PageSocial::where("page_id", $page->id)->where("option_id", $option->key)->delete();
                $result = Social::setOption($option->key, $option->value, $page->id);
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

    public function saveResume(Request $request)
    {
        $messages = [
            "about.max" => "بایوگرافی می‌تواند حداکثر 2500 کاراکتر باشد",
        ];
        $validator = Validator::make($request->all(), [
            "about" => "max:2500",
        ]);
        if ($validator->fails()) {
            return response()->json(array("result" => false, "errors" => $validator->errors()));
        } else {
            $page = Auth::user()->personalPage;
            if ($request->filled("about")) {
                $page->about = $request->about;
            }

            if ($request->filled("skills")) {
                $skills = $request->skills;
            }

            if ($request->filled("achievements")) {
                $achievements = $request->achievements;

            }

            $page->save();

        }
    }

    public function saveProfile(Request $request)
    {
        $messages = [
            "gender.required" => "جنسیت اجباری است",
            "firstname.required" => "نام اجباری است",
            "lastname.required" => "نام‌خانوادگی اجباری است",
        ];
        $validator = Validator::make($request->all(), [
            "firstname" => "required",
            "lastname" => "required",
            "gender" => "required",
        ]);
        if ($validator->fails()) {
            return response()->json(array("result" => false, "errors" => $validator->errors()));
        } else {
            $page = Auth::user()->getPage();
            $page->name = $request->firstname . " " . $request->lastname;

            $user = Auth::user();
            $user->name = $request->firstname . " " . $request->lastname;
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

}
