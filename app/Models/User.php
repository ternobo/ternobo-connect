<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Laravel\Passport\HasApiTokens;
use Ternobo\TernoboChat\Interfaces\Messageable;
use Ternobo\TernoboChat\Traits\CanChat;

class User extends Authenticatable implements Messageable
{

    use CanChat;

    use Notifiable;

    use HasFactory;

    use SoftDeletes;

    use HasApiTokens;

    protected $dates = ['deleted_at', 'created_at', 'updated_at'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'email',
        'first_name',
        'last_name',
        'gender',
        'short_bio',
        'username',
        'phone',
        'cover',
        'profile',
        'nationalcode',
        'is_verified',
        "is_admin",
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
        "api_token",
        "created_at",
        "updated_at",
        "token",
        "phone_verified_at",
        "followings",
        'connections',
        "nationalcode",
        "nationalcard",
        "pushe_id",
        "phone",
        "email",
        "two_factor_type",
        "two_factor_recovery_codes",
        "two_factor_secret",
        "two_factor_enabled",
        "two_factor",
        "email_verified_at",
        "deleted_at",
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Conversations Query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function conversations(): Builder
    {
        return Conversation::query()->whereJsonContains("members", $this->id);
    }

    public function invited_by()
    {
        return $this->belongsTo(User::class, "invited_by");
    }

    public function generateToken()
    {
        $token = "";
        do {
            $token = $this->getToken();
        } while (User::where("api_token", $token)->first() instanceof User);
        $this->token = $token;

        $api_key = "";
        do {
            $api_key = $this->getAPI_key();
        } while (User::where("api_token", $api_key)->first() instanceof User);
        $this->api_token = $api_key;
    }

    private function getToken()
    {
        $length = 18;
        $token = "";
        $codeAlphabet = "0123456789";

        for ($i = 0; $i < $length; $i++) {
            $token .= $codeAlphabet[mt_rand(0, strlen($codeAlphabet) - 1)];
        }
        return $token;
    }

    private function getAPI_key()
    {
        $length = 32;
        $token = "";
        $codeAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        $codeAlphabet .= "0123456789";

        for ($i = 0; $i < $length; $i++) {
            $token .= $codeAlphabet[mt_rand(0, strlen($codeAlphabet) - 1)];
        }
        return $token;
    }

    public function getPages()
    {
        $pages = Page::where("user_id", $this->id)->where("type", "company")->get();
        return $pages;
    }

    public function getPosts()
    {
        $pages = Page::query()->where("user_id", $this->id)->where("type", "!=", "company")->get();
        $posts = Post::query();
        $i = 0;
        foreach ($pages as $page) {
            if ($i > 0) {
                $posts = $posts->orWhere("page_id", $page->id);
            } else {
                $posts = $posts->where("page_id", $page->id);
            }
        }
        return $posts->get();
    }

    public function followings()
    {
        return $this->hasManyThrough("App\Models\Following", Page::class);
    }
    public function posts()
    {
        return $this->hasMany(Post::class);
    }
    public function actions()
    {
        return $this->hasMany(Action::class);
    }
    public function followers()
    {
        return $this->hasManyThrough("App\Models\Following", Page::class);
    }

    public function likes()
    {
        return $this->hasManyThrough(Like::class, Page::class);
    }

    public function commets()
    {
        return $this->hasManyThrough(Comment::class, Page::class);
    }

    public function aboutData()
    {
        return $this->hasOneThrough(AboutData::class, Page::class);
    }

    public function activeSessions()
    {
        return $this->hasMany(ActiveSession::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    public function tips()
    {
        return $this->hasManyThrough(Tip::class, Post::class);
    }

    /**
     * Return profile steps
     */
    public function getProfileSteps()
    {

        $done_num = 0;
        $done_steps = [];
        $undone_steps = [];

        $steps = [
            "profile_image" => ["name" => "بارگزاری نمایه", "button" => "بارگزاری نمایه", "text" => "با انتخاب و بارگزاری یک عکس پروفایل خوب، حرفه‌ای تر دیده شوید.", "icon" => "person_pin", "action" => 'upload_profile'],
            "short_bio" => ["name" => "ثبت عنوان", "button" => "ثبت عنوان", "text" => "با ثبت کردن عنوانتان به دیگران کمک کنید تا بهتر شما را بشناسند.", "icon" => "short_text", 'action' => 'set_shortbio'],
            "biography" => ["name" => "نوشتن بایوگرافی", "button" => "نوشتن بایوگرافی", "text" => "نوشتن یک بایوگرافی جامع به شناخت بهتر شما به دیگران کمک می‌کند.", "icon" => "playlist_add_check", "action" => "set_biography"],
            "skills" => ["name" => "ثبت مهارت", "button" => "ثبت مهارت", "text" => "به دیگران بگویید که در چه زمینه‌هایی مهارت و تخصص دارید.", "icon" => "person_pin", 'action' => 'set_skills'],
            "first_post" => ["name" => "انتشار اولین مطلب", "button" => "نوشتن مطلب", "text" => "اولین پست یا مقاله خود را در ترنوبو به اشتراک بگذارید", "icon" => "person_pin", "action" => 'add_post'],
            "verification" => ["name" => "تایید هویت", "button" => "تایید هویت", "text" => "هویت حساب خود را در ترنوبو تایید کنید تا بیشتر و بهتر دیده شوید", "icon" => "person_pin", "action" => 'verfication'],
        ];

        foreach ($steps as $step => $data) {
            switch ($step) {
                case "profile_image":
                    if (Auth::user()->profile === url("/img/man-profile.png") || Auth::user()->profile === url("/img/woman-profile.png")) {
                        $data["done"] = false;
                        $steps[$step] = $data;
                        $undone_steps[] = $steps[$step];
                    } else {
                        $done_num++;
                        $done_steps[] = $steps[$step];
                    }
                    break;
                case "short_bio":
                    if (Auth::user()->short_bio === "" || Auth::user()->short_bio === null) {
                        $data["done"] = false;
                        $steps[$step] = $data;
                        $undone_steps[] = $steps[$step];
                    } else {
                        $done_num++;
                        $done_steps[] = $steps[$step];
                    }
                    break;
                case "biography":
                    if (Auth::user()->getPage()->about === null || Auth::user()->getPage()->about === "") {
                        $data["done"] = false;
                        $steps[$step] = $data;
                        $undone_steps[] = $steps[$step];
                    } else {
                        $done_num++;
                        $done_steps[] = $steps[$step];
                    }
                    break;
                case "skills":
                    if (count(Auth::user()->skills) < 1) {
                        $data["done"] = false;
                        $steps[$step] = $data;
                        $undone_steps[] = $steps[$step];
                    } else {
                        $done_num++;
                        $done_steps[] = $steps[$step];
                    }
                    break;
                case "first_post":
                    if (count(Auth::user()->getPosts()) < 1) {
                        $data["done"] = false;
                        $steps[$step] = $data;
                        $undone_steps[] = $steps[$step];
                    } else {
                        $done_num++;
                        $done_steps[] = $steps[$step];
                    }
                    break;
                case "verification":
                    if (Auth::user()->nationalcard === null) {
                        $data["done"] = false;
                        $steps[$step] = $data;
                        $undone_steps[] = $steps[$step];
                    } else {
                        $done_num++;
                        $done_steps[] = $steps[$step];
                    }
                    break;
            }
        }
        $result = [
            "done_steps" => $done_steps,
            "undone_steps" => $undone_steps,
            "percent" => (int) (($done_num / 6) * 100),
        ];

        return json_decode(json_encode($result));
    }

    /**
     * Check if following a page
     */
    public function isFollowing($id)
    {
        $page = Page::getPersonalPage($id);
        $connection = Following::where("page_id", $this->id)->where("following", $page->id);
        return $connection->first();
    }

    /**
     * check if user is connected to another user.
     */
    public function isConnected($id)
    {
        $connection = Connection::query()->whereRaw("(user_id = '$this->id' AND connection_id = '$id') OR (user_id = '$id' AND connection_id = '$this->id')")->first();
        return $connection;
    }
    /**
     * Check if a connection is accepted by user
     */
    public function isAcceptedConnection($id)
    {
        $connection = Connection::query()->whereRaw("(user_id = '$this->id' AND connection_id = '$id') OR (user_id = '$id' AND connection_id = '$this->id')")->first();
        return ($connection instanceof Connection) ? $connection->accepted : false;
    }

    /**
     * User personal Page
     */
    public function personalPage()
    {
        return $this->hasOne("App\Models\Page", "user_id")->where("type", "personal");
    }

    /**
     * User pages
     */
    public function pages()
    {
        return $this->hasMany("App\Models\Page", "user_id");
    }

    /**
     * Get user personal page (deprecated)
     */
    public function getPage()
    {
        return Page::where("user_id", $this->id)->where("type", "personal")->first();
    }

    /**
     * Check if a post is liked by user.
     */
    public function isPostLiked($id)
    {
        $page = $this->getPage();
        return (Like::query()->where("post_id", $id)->where("page_id", $page->id)->first() instanceof Like);
    }

    /**
     * Check if a commnet is liked by user.
     */
    public function isCommentLiked($id)
    {
        $page = $this->getPage();
        return (Like::query()->where("comment_id", $id)->where("page_id", $page->id)->first() instanceof Like);
    }

    /**
     * Return bookmarks
     */
    public function bookmarks()
    {
        return $this->hasMany("App\Models\Bookmark");
    }

    /**
     * return skills
     */
    public function skills()
    {
        return $this->hasMany("App\Models\Skill", "user_id")->orderBy("sort_place");
    }

    /**
     * Check if user credit a skill before.
     */
    public function isCredit($id)
    {
        return SkillCredit::query()->where("user_id", $this->id)->where("skill_id", $id)->first() instanceof SkillCredit;
    }

    /**
     * Return Connections.
     */
    public function getConnections()
    {
        return Connection::query()
            ->whereRaw("(connection_id = '$this->id' or user_id = '$this->id')")
            ->where("accepted", true)
            ->get()
            ->toArray();
    }

    /**
     * Return Connections list (col id only).
     */
    public function getConnectionsIds()
    {
        $connections = Connection::query()
            ->whereRaw("(connection_id = '$this->id' or user_id = '$this->id')")
            ->where("accepted", true)
            ->get();
        $list = array();
        foreach ($connections as $connection) {
            $connection = $connection->toArray();
            if ($connection["connection_id"] == Auth::user()->id) {
                $list[] = $connection["user_id"];
            } else {
                $list[] = $connection["connection_id"];
            }
        }
        return $list;
    }

    /**
     * create a new conversation or return precreated convertsation with the user
     */
    public function startConversationWith($user_id)
    {
        $members = [
            (int) parent::getAttribute('id'),
            (int) $user_id,
        ];
        $conversation = Conversation::query()->whereRaw("members = CAST('" . json_encode($members) . "' AS JSON)")->firstOrNew();
        $conversation->type = count($members) > 2 ? 'group' : 'private';
        $conversation->created_by = count($members) > 2 ? parent::getAttribute('id') : null;
        $conversation->members = json_encode($members);
        $conversation->save();
        return $conversation;
    }

    /**
     * Get list of Pending Connections
     */
    public function getWaitingConnectionsIds()
    {
        $connections = Connection::query()
            ->whereRaw("(connection_id = '$this->id' or user_id = '$this->id')")
            ->where("accepted", false)
            ->get();
        $list = array();
        foreach ($connections as $connection) {
            $connection = $connection->toArray();
            if ($connection["connection_id"] == Auth::user()->id) {
                $list[] = $connection["user_id"];
            } else {
                $list[] = $connection["connection_id"];
            }
        }
        return $list;
    }

    /**
     * Check if there is any unread notification
     *
     * return boolval
     */
    public function hasUnreadNotification()
    {
        $notification = Notification::query()->where("page_id", $this->getPage()->id)->where("seen", false)->get();
        return (count($notification) > 0);
    }

    /**
     * Check if there is any pending connection, not seened.
     *
     * return boolval
     */
    public function hasUnreadConnection()
    {
        $notification = Connection::query()->where("user_id", Auth::user()->id)->where("seen", false)->get();
        return (count($notification) > 0);
    }

    public function getClass()
    {
        return User::class;
    }

    /**
     *
     */
    public function addMedia($data)
    {
        $data['user_id'] = $this->id;
        return Media::query()->where("filename", $data['filename'])->where("user_id", $this->id)->firstOrCreate($data);
    }

    /**
     * Add Active Session and return token
     */
    public function addAPISession()
    {
        $session = ActiveSession::addSession($this->id);
        return $session->token;
    }

    /** Get user Notifications */
    public function getNotifications()
    {
        $notificationsPaginator = Notification::query()
            ->where(function ($query) {
                $query->where("to", $this->personalPage->id)
                    ->orWhere("to", "-1");
            })
            ->where("created_at", ">=", Carbon::now()->subMonth())
            ->whereHasMorph("notifiable", [Post::class, Skill::class, Comment::class, Page::class])
            ->orderByDesc("pin", "created_at")
            ->with(["sender", "notifiable"])
            ->paginate(30);
        $notifications = $notificationsPaginator;

        $next_page_url = $notificationsPaginator->nextPageUrl();

        $groups = [];
        $group_index = 0;
        $prevGroup = "unset";
        foreach ($notifications as $notification) {
            $notification->seen();
            $index = "notifiable_" . $notification->action . '_' . $notification->notifiable_id . "_" . $group_index;
            if (isset($groups[$index])) {
                $notification = $notification->toArray();
                $group = $groups[$index];
                $group["notifiable"] = $notification["notifiable"];

                $group['updated_at'] = new Carbon($notification["created_at"]);
                $group['action'] = $notification['action'];

                array_push($group["notifications"], $notification);
                $groups[$index] = $group;

                if ($prevGroup != "unset" && isset($groups[$prevGroup]) && !$groups[$index]["updated_at"]->isSameDay($groups[$prevGroup]["updated_at"])) {
                    $index++;
                }

            } else {
                $notification = $notification->toArray();
                $group = $this->createNotificationGroup($notification['notifiable_id']);
                $group["notifiable"] = $notification["notifiable"];
                $group["notifiable_type"] = $notification["notifiable_type"];
                $group["notifiable_id"] = $notification["notifiable_id"];
                unset($notification["notifiable"]);
                $group['action'] = $notification['action'];
                $group['updated_at'] = new Carbon($notification["created_at"]);
                array_push($group["notifications"], $notification);
                $groups[$index] = $group;
            }
            $prevGroup = $index;
        }
        uasort($groups, function ($a, $b) {
            return $b['updated_at']->greaterThan($a['updated_at']) ? 1 : 0;
        });
        return ["data" => array_values($groups), 'next_page_url' => $notificationsPaginator->nextPageUrl()];
    }

    private function createNotificationGroup($notifiable_id)
    {
        return [
            "notifications" => [],
            "notifiable" => null,
            "notifiable_id" => $notifiable_id,
            "updated_at" => null,
        ];
    }

    /**
     * Convert the model instance to an array.
     *
     * @return array
     */
    public function toArray()
    {
        $array = parent::toArray();
        $array['personal_page_id'] = $this->personalPage->id;
        if (!ActiveSession::isAdmin()) {
            unset($array['is_admin']);
        }
        return $array;
    }

    public function forceDelete()
    {
        $this->activeSessions()->forceDelete();
        $this->aboutData()->forceDelete();
        $this->likes()->forceDelete();
        $this->commets()->forceDelete();
        $this->followers()->forceDelete();
        $this->followings()->forceDelete();
        $this->actions()->forceDelete();
        $this->posts()->forceDelete();
        $this->skills()->forceDelete();
        $this->pages()->forceDelete();
        $this->bookmarks()->forceDelete();
        return parent::forceDelete();
    }

    public function makePage()
    {
        $page = new Page();
        $page->name = $this->first_name . " " . $this->last_name;
        $page->slug = $this->username;
        $page->profile = $this->profile;
        $page->cover = $this->cover;
        $page->short_bio = $this->short_bio;
        $page->user_id = $this->id;
        $page->type = "personal";
        return $page;
    }

    public function save(array $options = [])
    {
        $this->username = strtolower($this->username);
        if ($this->gender == "1" && $this->profile == null) {
            $this->profile = url("/img/woman-profile.png");
        } elseif ($this->profile == null) {
            $this->profile = url("/img/man-profile.png");
        }

        if ($this->cover == null) {
            $this->cover = url("/img/cover.jpg");
        }

        $page = $this->personalPage;

        if ($page !== null) {
            $page->name = $this->first_name . " " . $this->last_name;
            $page->slug = $this->username;
            $page->profile = $this->profile;
            $page->cover = $this->cover;
            $page->short_bio = $this->short_bio;
            $page->save();
        }
        return parent::save();
    }

}
