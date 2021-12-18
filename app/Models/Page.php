<?php

namespace App\Models;

use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;
use App\Ternobo;
use App\HasUser;
use App\Facade\UserBadgeService;
use App\Facade\MonetizationService;
use Illuminate\Support\Facades\Request;

class Page extends Model
{

    use SoftDeletes;
    use HasUser;

    protected $dates = ['deleted_at'];
    protected $casts = [
        'visible' => "boolean",
    ];

    public function contactData()
    {
        return $this->hasOne("App\Models\ContactData", "page_id")->withDefault(function () {
            return new ContactData(["data" => []]);
        });;
    }

    public function aboutData()
    {
        return $this->hasOne("App\Models\AboutData", "page_id")->withDefault(function () {
            return new AboutData(["data" => []]);
        });
    }

    public function page()
    {
        return $this->hasOne("App\Models\Page", "id")->where("id", '-2');
    }

    public function followers()
    {
        return $this->hasMany(Following::class, "following");
    }

    public function followings()
    {
        return $this->hasMany(Following::class, "page_id");
    }

    /**
     * list page's categories (App\Category)
     * @var array()
     */
    public function categories()
    {
        return $this->hasMany('App\Models\Category')->orderBy("sort_place");
    }

    /**
     * The owner User
     * @var \App\User
     */
    public function user()
    {
        return $this->belongsTo("App\Models\User", "user_id");
    }

    /**
     * Page Skills
     */
    public function skills()
    {
        return $this->hasMany(Skill::class, "user_id", "user_id")
            ->with("credits");
    }

    /**
     * Page Posts
     */
    public function posts()
    {
        return $this->hasMany("App\Models\Post", "page_id");
    }

    public function follow()
    {
        $followRow = Following::query()->where("page_id", Ternobo::currentPage()->id)->where("following", $page_id)->firstOrNew();
        $followRow->following = $page_id;
        $followRow->page_id = Ternobo::currentPage()->id;
        return $followRow->save();
    }

    public function unfollow()
    {
        $page_id = $this->id;
        $followRow = Following::query()->where("page_id", Ternobo::currentPage()->id)
            ->where(function ($query) use ($page_id) {
                $query->where("following", $page_id);
            })->first();

        if ($followRow instanceof Following) {
            Notification::query()->where("connected_to", $followRow->id)->delete();
            return $followRow->delete();
        }
        return false;
    }

    public function isBlockedByMe()
    {
        return BlockedPage::query()->where("user_id", Auth::user()->id)->where("page_id", $this->id)->exists();
    }

    public function isBlockedMe()
    {
        return BlockedPage::query()->where("user_id", $this->user_id)->where("page_id", Ternobo::currentPage()->id)->exists();
    }

    // override the toArray function (called by toJson)
    public function toArray()
    {
        // get the original array to be displayed
        $data = parent::toArray();

        $gateways = UserOption::getOption("payment_gateways", UserOption::$defaultPaymentOption, $data['user_id']);
        $data['has_donate'] = $gateways['zarinpal']['enabled'] && MonetizationService::canAccessMonetization($data['user_id']);
        $data['badge_status'] = UserBadgeService::getUserBadge(isset($data['user']) ? $this->user : $data['user_id'], $this);

        if (Request::route() != null && Request::route()->uri == '{page}/{location?}') {
            $data['blocked'] = Ternobo::isUserLogedIn() ? BlockedPage::query()->where("user_id", Auth::user()->id)->where("page_id", $data['id'])->exists() : false;
            if ($data['blocked']) {
                $data['skills'] = null;
                $data['about'] = null;
            }
            $data['contact_data'] = isset($data['contact_data']) && !$data['blocked'] ? $data['contact_data']['data'] : null;
            $data['about_data'] = isset($data['about_data']) && !$data['blocked'] ? $data['about_data']['data'] : null;
        }

        $data['is_nickname'] = false;
        if (isset($data['nickname'])) {
            $data['name'] = $data['nickname'];
            $data['is_nickname'] = true;
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
     * Begin querying the model.
     *
     * @return array()
     */
    public function getActions($action = null, $page = 10)
    {
        $actions = Action::query()
            ->with("post")
            ->with("post.page")
            ->with("post.category")
            ->where("page_id", $this->id)->latest();

        if (Ternobo::isUserLogedIn()) {
            $actions = $actions->with("post.mutualLikes");
        }

        if ($action != null && $action != "all") {
            $actions = $actions->where("action", $action);
        }

        return $actions->paginate($page);
    }

    public function mutualFriends()
    {
        return Ternobo::isUserLogedIn() ? Page::query()->whereIn("id", Ternobo::currentPage()->followings()->select("following"))
            ->whereIn("id", $this->followers()->select("page_id"))
            ->where("id", "!=", Ternobo::currentPage()->id)
            ->get() : [];
    }

    /**
     * return Mutual Friends text
     *      Connections list is optional it return common friends if @param connections is null
     * @param array $connections
     * @return string
     */
    public function getMutualsText($connections = null)
    {
        $and = __("application.and");
        if ($connections === null) {
            $connections = $this->mutualFriends();
        }
        $nums = count($connections);
        if ($nums > 2) {
            $first = $connections[0]->name;
            $second = $connections[1]->name;
            $nums -= 2;
            return "$first, $second $and ...";
        } elseif ($nums === 2) {
            $first = $connections[0]->name;
            $second = $connections[1]->name;
            $nums -= 2;
            return " $first $and $second";
        } elseif ($nums > 0) {
            $first = $connections[0]->name;
            return "$first";
        }
        return "";
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
                    ->whereRaw("followings.page_id IN (SELECT following from followings where page_id='$user->id')")
                    ->whereRaw("followings.following NOT IN (SELECT following from followings where page_id='$user->id')")
                    ->where("pages.user_id", "!=", Auth::user()->id)
                    ->select(array("pages.*"))
                    ->get();

                if (count($pages) > 3) {
                    $pages = $pages->random(3);
                } else {
                    if (count(Page::all()) > 3) {
                        $pages = Page::query()
                            ->distinct("pages.id")
                            ->where("pages.user_id", "!=", Auth::user()->id)
                            ->get()->random(3);
                    }
                }
            } else {
                if (count(Page::all()) > 3) {
                    $pages = Page::query()
                        ->distinct("pages.id")
                        ->where("pages.user_id", "!=", Auth::user()->id)
                        ->get()->random(3);
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

    public static function checkSlug($slug, $ignore = null)
    {
        $query = Page::query()->where("slug", $slug);
        if (Auth::check()) {
            if ($ignore == null) {
                $ignore = Auth::user()->personalPage->id;
            }
        }
        if ($ignore != null) {
            $query = $query->where("id", '!=', $ignore);
        }

        return !($query->where("slug", $slug)->first() instanceof Page);
    }
}
