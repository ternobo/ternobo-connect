<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Ternobo\TernoboChat\Interfaces\Messageable;
use Ternobo\TernoboChat\Traits\CanChat;

class User extends Authenticatable implements Messageable
{

    use CanChat;

    use Notifiable;

    use HasFactory;

    use SoftDeletes;

    protected $dates = ['deleted_at'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
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
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

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
        return $this->hasMany("App\Models\Following");
    }

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

    public function isFollowing($id)
    {
        $page = Page::getPersonalPage($id);
        $connection = Following::where("user_id", $this->id)->where("following", $page->id);
        return $connection->first();
    }

    public function isConnected($id)
    {
        $connection = Connection::query()->whereRaw("(user_id = '$this->id' AND connection = '$id') OR (user_id = '$id' AND connection = '$this->id')")->first();
        return $connection;
    }

    public function isAcceptedConnection($id)
    {
        $connection = Connection::query()->whereRaw("(user_id = '$this->id' AND connection = '$id') OR (user_id = '$id' AND connection = '$this->id')")->first();
        return ($connection instanceof Connection) ? $connection->accepted : false;
    }

    public function personalPage()
    {
        return $this->hasOne("App\Models\Page", "user_id")->where("type", "personal");
    }

    public function pages()
    {
        return $this->hasMany("App\Models\Page", "user_id");
    }

    public function getPage()
    {
        return Page::where("user_id", $this->id)->where("type", "personal")->first();
    }

    public function isPostLiked($id)
    {
        $page = $this->getPage();
        return (Like::query()->where("post_id", $id)->where("page_id", $page->id)->first() instanceof Like);
    }

    public function isCommentLiked($id)
    {
        $page = $this->getPage();
        return (Like::query()->where("comment_id", $id)->where("page_id", $page->id)->first() instanceof Like);
    }

    public function bookmarks()
    {
        return $this->hasMany("App\Models\Bookmark");
    }

    public function skills()
    {
        return $this->hasMany("App\Models\Skill", "user_id")->orderBy("sort_place");
    }

    public function isCredit($id)
    {
        return SkillCredit::query()->where("user_id", $this->id)->where("skill_id", $id)->first() instanceof SkillCredit;
    }

    public function getConnections()
    {
        return Connection::query()
            ->whereRaw("(connection = '$this->id' or user_id = '$this->id')")
            ->where("accepted", true)
            ->get()
            ->toArray();
    }

    public function getConnectionsIds()
    {
        $connections = Connection::query()
            ->with("connection")
            ->with("user")
            ->whereRaw("(connection = '$this->id' or user_id = '$this->id')")
            ->where("accepted", true)
            ->get();
        $list = array();
        foreach ($connections as $connection) {
            $connection = json_decode(json_encode($connection->toArray()));
            if ($connection->connection->id === Auth::user()->id) {
                $list[] = $connection->user_id;
            } else {
                $list[] = $connection->connection->id;
            }
        }
        return $list;
    }

    public function getWaitingConnectionsIds()
    {
        $connections = Connection::query()
            ->with("connection")
            ->with("user")
            ->whereRaw("(connection = '$this->id' or user_id = '$this->id')")
            ->where("accepted", false)
            ->get();
        $list = array();
        foreach ($connections as $connection) {
            $connection = json_decode(json_encode($connection->toArray()));
            if ($connection->connection->id === Auth::user()->id) {
                $list[] = $connection->user_id;
            } else {
                $list[] = $connection->connection->id;
            }
        }
        return $list;
    }

    public function hasUnreadNotification()
    {
        $notification = Notification::query()->where("page_id", $this->getPage()->id)->where("seen", false)->get();
        return (count($notification) > 0);
    }

    public function hasUnreadConnection()
    {
        $notification = Connection::query()->where("user_id", Auth::user()->id)->where("seen", false)->get();
        return (count($notification) > 0);
    }

    /**
     * Convert the model instance to an array.
     *
     * @return array
     */
    public function toArray()
    {
        $array = parent::toArray();
        if (Auth::check() && Auth::user()->id == $this->id) {
            $array['profile_steps'] = $this->getProfileSteps();
            $array['page'] = $this->personalPage;
        }

        return $array;
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
