<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class Page extends Model
{

    use SoftDeletes;

    protected $dates = ['deleted_at'];

    public function education()
    {
        return $this->hasMany("App\Models\Experience", "user_id", "user_id");
    }

    public function expreciences()
    {
        return $this->hasMany("App\Models\Experience", "user_id", "user_id");
    }

    public function achievements()
    {
        return $this->hasMany("App\Models\Achievement", "page_id");
    }

    /**
     * list page's categories (App\Category)
     * @var array()
     */
    public function categories()
    {
        return $this->hasMany('App\Models\Category');
    }

    /**
     * The owner User
     * @var \App\User
     */
    public function user()
    {
        return $this->belongsTo("App\Models\User", "user_id");
    }

    public function skills()
    {
        if ($this->type === "personal") {
            return $this->belongsTo("App\Models\Skill", "user_id", "user_id");
        } else {
            return new HasManyEmpty(Page::query(), $this, '', '');
        }
    }

    public function posts()
    {
        return $this->hasMany("App\Models\Post", "page_id");
    }

    /**
     * Return Personal Page of user
     * @param integer $user_id
     * @return \App\Page
     */
    public static function getPersonalPage($user_id)
    {
        $page = Page::where("user_id", $user_id)->where("type", "personal")->first();
        return $page;
    }

    public function getContacts()
    {
        $contacts = Contact::query()->where("contacts.page_id", $this->id)->join("contact_options", "contacts.option_id", "=", "contact_options.id")->get();
        foreach ($contacts as $contact) {
            if (!$this->startsWith($contact->url, $contact->starts_with)) {
                $contact->url = $contact->starts_with . $contact->url;
            }
        }
        return $contacts;
    }

    /**
     * list of available website options
     * @return array()
     */
    public static function websiteOptions()
    {
        $websiteoptions = WebsiteOption::all();
        return $websiteoptions;
    }

    /**
     * get website value base on option id
     * @param integer $id
     * @return string
     */
    public function getWebsiteValue($id)
    {
        $website = Website::query()->where("page_id", $this->id)->where("option_id", $id)->get();
        if ($website instanceof Website) {
            return $website->url;
        }
        return null;
    }

    /**
     * Get list of all websites
     * @return array
     */
    public function getWebsites()
    {
        $websites = Website::query()->where("page_id", $this->id)->join("website_options", "websites.option_id", "=", "website_options.id")->get();
        foreach ($websites as $website) {
            if (!$this->startsWith($website->url, "http://")) {
                $website->url = "http://" . $website->url;
            }
        }
        return $websites;
    }

    /**
     * Get list of all social media links
     * @return array
     */
    public function getSocials()
    {
        $socials = PageSocial::query()->where("page_id", $this->id)->join("socials", "page_socials.option_id", "=", "socials.id")->get();
        foreach ($socials as $social) {
            if (!$this->startsWith($social->url, $social->starts_with)) {
                $social->url = $social->starts_with . $social->url;
            }
        }
        return $socials;
    }

    /**
     * list of available website options
     * @return array
     */
    public static function SocialOptions()
    {
        $socialoptions = Social::all();
        return $socialoptions;
    }

    /**
     * return social media link base on option id
     * @param integer $name
     * @return string
     */
    public function getSocialValue($name)
    {
        $contact = PageSocial::query()->where("page_id", $this->id)->where("option_id", $name);
        if ($contact instanceof PageSocial) {
            return $contact->url;
        }
        return null;
    }

    /**
     * return contact option value base on option id
     * @param integer $name
     * @return string
     */
    public function getContactValue($name)
    {
        $contact = Contact::query()->where("page_id", $this->id)->where("option_id", $name)->get();
        if ($contact instanceof Contact) {
            return $contact->url;
        }
        return null;
    }

    public static function getContactOptions()
    {
        $contactoptions = ContactOption::all();
        return $contactoptions;
    }

    // override the toArray function (called by toJson)
    public function toArray()
    {
        // get the original array to be displayed
        $data = parent::toArray();

        // change the value of the 'skills' key
        if (!isset($data['skills'])) {
            if ($this->skills) {
                $data['skills'] = $this->skills;
            } else {
                $data['skills'] = null;
            }

        }

        // change the value of the 'categories' key
        if (!isset($data['categories'])) {
            if ($this->categories) {
                $data['categories'] = $this->categories;
            } else {
                $data['categories'] = null;
            }
        }

        if (Auth::check()) {
            $data['mutualFriends'] = $this->mutualFriends();
        }

        return $data;
    }

    public function addAction($action_type, $post_id, $connected_to = null)
    {
        $action = new Action();
        $action->post_id = $post_id;
        $action->page_id = $this->id;
        $action->action = $action_type;
        $action->connected_to = $connected_to;

        $this->touch();

        return $action->save();
    }

    /**
     * Get Articles Query Builder
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function getArticles($category = null)
    {
        $posts = Post::query()
            ->join("users", "posts.user_id", "=", "users.id")
            ->where("posts.type", "article")
            ->where("posts.page_id", $this->id)
            ->leftJoin("categories", "categories.id", "=", "posts.category_id")
            ->select(array("posts.*", "categories.name as category_name", "users.name as user_name", "users.short_bio as short_bio", "users.profile as profile"))
            ->latest();
        if ($category !== null) {
            $posts = $posts->where("posts.category_id", $category);
        }
        return $posts;
    }

    public function getPosts($category = null)
    {
        $posts = Post::query()
            ->join("users", "posts.user_id", "=", "users.id")
            ->where("posts.type", "post")
            ->where("posts.page_id", $this->id)
            ->leftJoin("categories", "categories.id", "=", "posts.category_id")
            ->select(array("posts.*", "categories.name as category_name", "users.name as user_name", "users.short_bio as short_bio", "users.profile as profile"))
            ->latest();
        if ($category !== null) {
            $posts = $posts->where("posts.category_id", $category);
        }
        return $posts;
    }

    public function getCategories()
    {
        $categories = Category::query()->where("page_id", $this->id)
            ->orderBy("sort_place")
            ->get();
        return $categories;
    }

    /**
     * Begin querying the model.
     *
     * @return array()
     */
    public function getActions($action = null, $page = null, $category = null)
    {
        $actions = Action::query()
            ->with("post")
            ->with("post.page")
            ->with("post.likes")
            ->with("post.mutualLikes")
            ->with("post.category")
            ->where("page_id", $this->id)->latest();


        if ($category !== null) {
            $actions = $actions->whereHas("post", function ($query) use ($category){
                $query->where("category_id",$category);
            });
        }

        if ($action !== null) {
            $actions = $actions->where("action", $action);
        }
        if ($page !== null) {
            $actions = $actions->paginate($page, "*", "action_page");
        } else {
            $actions = $actions->get();
        }
        return $actions;
    }

    public function parseAction($action)
    {
        $post = Post::query()
            ->join("users", "posts.user_id", "=", "users.id")
            ->where("posts.id", $action->post_id)
            ->leftJoin("categories", "categories.id", "=", "posts.category_id")
            ->select(array("posts.*", "categories.name as category_name", "users.name as user_name", "users.short_bio as short_bio", "users.profile as profile"))
            ->first();
        if ($post instanceof Post) {
            if (Auth::check()) {
                if (($post->show === "private" && !Auth::user()->isAcceptedConnection($post->user_id))) {
                    return null;
                }
            } else {
                if ($post->show === "private") {
                    return null;
                }
            }
        }
        $view = "";
        if ($post instanceof Post) {
            switch ($action->action) {
                case "like":
                    $action_text = $this->name . " این محتوا را پسندید";
                    $view = view("layouts.post-card", array("action_text" => $action_text, "post" => $post))->render();
                    break;
                case "post":
                    $view = view("layouts.post-card", array("post" => $post))->render();
                    break;
                case "comment":
                    $action_text = $this->name . " برای این محتوا نظر گذاشت";
                    $comment = Comment::find($action->connected_to);
                    //    dd($action->connetecd_to);
                    $view = view("layouts.post-card", array("action_text" => $action_text, "the_comment" => $comment, "post" => $post))->render();
                    break;
                case "share":
                    $action_text = $this->name . " این محتوا را بازنشر کرد";
                    $view = view("layouts.post-card", array("action_text" => $action_text, "post" => $post))->render();
                    break;
            }
            return $view;
        }
    }

    public function mutualFriends()
    {
        $userA = Auth::user()->id;
        $usertB = $this->user_id;
        $mutuals = array();
        $users = array();
        $connections = DB::select("SELECT" .
            "       *  " .
            "   FROM  " .
            "       (  " .
            "       SELECT  " .
            "           *  " .
            "       FROM  " .
            "           connections  " .
            "       WHERE  " .
            "           connections.user_id = $userA OR connections.connection = $userA  " .
            "   ) AS UserAConnetions " .
            "   INNER JOIN(  " .
            "       SELECT  " .
            "           *  " .
            "       FROM  " .
            "           connections  " .
            "       WHERE  " .
            "           connections.user_id = $usertB OR connections.connection = $usertB  " .
            "   ) AS UserBConnetions  " .
            "   ON  " .
            "       (  " .
            "           UserBConnetions.user_id = UserAConnetions.user_id OR UserAConnetions.connection = UserBConnetions.connection OR UserBConnetions.user_id = UserAConnetions.connection OR UserAConnetions.user_id = UserBConnetions.connection  " .
            "      )  "
            . " INNER JOIN users on (UserBConnetions.user_id = users.id or UserBConnetions.connection = users.id)"
            . "where users.id != $this->user_id and users.id != $userA and users.id != $usertB"
        );
        foreach ($connections as $connection) {
            if (!in_array($connection, $mutuals)) {
                if (Auth::user()->isAcceptedConnection($connection->id)) {

                    unset($connection->token);
                    unset($connection->accepted);
                    unset($connection->api_token);
                    unset($connection->created_at);
                    unset($connection->deleted_at);
                    unset($connection->email);
                    unset($connection->phone);
                    unset($connection->pushe_id);
                    unset($connection->remember_token);
                    unset($connection->phone_verified_at);
                    unset($connection->nationalcard);
                    unset($connection->nationalcode);
                    unset($connection->connection);
                    unset($connection->password);

                    $mutuals[] = $connection;
                }
            }
        }
        return $mutuals;
    }

    /**
     * return Mutual Friends text
     *      Connections list is optional it return common friends if @param connections is null
     * @param array $connections
     * @return string
     */
    public function getMutualsText($connections = null)
    {
        if ($connections === null) {
            $connections = $this->getMutuals();
        }
        $nums = count($connections);
        if ($nums > 2) {
            $first = $connections[0]->name;
            $second = $connections[1]->name;
            $nums -= 2;
            return "شما و $this->name هر دو  $first , $second و $nums نفر دیگر را می‌شناسید";
        } elseif ($nums === 2) {
            $first = $connections[0]->name;
            $second = $connections[1]->name;
            $nums -= 2;
            return "شما و $this->name هر دو $first و $second می‌شناسید";
        } elseif ($nums > 0) {
            $first = $connections[0]->name;
            return "$this->name $first را می‌شناسد";
        }
        return "";
    }

    private function startsWith($string, $startString)
    {
        $len = strlen($startString);
        return (substr($string, 0, $len) === $startString);
    }

    public static function getSuggestions()
    {
        $pages = array();
        if (Auth::check()) {
            $user = Auth::user();
            if (count(Auth::user()->followings) > 0) {
                $pages = Following::query()
                    ->distinct("pages.id")
                    ->join("pages", "pages.id", "=", "followings.following")
                    ->whereRaw("followings.user_id IN (SELECT following from followings where user_id='$user->id')")
                    ->whereRaw("followings.following NOT IN (SELECT following from followings where user_id='$user->id')")
                    ->where("pages.user_id", "!=", Auth::user()->id)
                    ->select(array("pages.*"))
                    ->get();

                if (count($pages) > 5) {
                    $pages = $pages->random(5);
                } else {
                    if (count(Page::all()) > 5) {
                        $pages = Page::query()
                            ->distinct("pages.id")
                            ->where("pages.user_id", "!=", Auth::user()->id)
                            ->get()->random(5);
                    }
                }
            } else {
                if (count(Page::all()) > 5) {
                    $pages = Page::query()
                        ->distinct("pages.id")
                        ->where("pages.user_id", "!=", Auth::user()->id)
                        ->get()->random(5);
                }
            }
        }
        $result = array();
        foreach ($pages as $page) {
            if (!(($user->isFollowing($page->user_id) instanceof Following) || ($user->isConnected($page->user_id) instanceof \App\Model\Connection))) {
                $result[] = $page;
            }
        }
        return $result;
    }

    protected static function boot()
    {
        parent::boot();

        self::saved(function ($model) {
            if($model->type == 'personal'){
                $user = $model->user;
                if ($page !== null) {
                    $user->username = $model->slug;
                    $user->profile = $model->profile;
                    $user->cover = $model->cover;
                    $user->short_bio = $model->short_bio;
                    $user->save();
                }
            }
        });
    }

}
