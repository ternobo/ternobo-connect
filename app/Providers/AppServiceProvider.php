<?php

namespace App\Providers;

use Ternobo\TernoboWire\TernoboWire;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\App;
use Carbon\Carbon;
use Artesaos\SEOTools\Facades\SEOTools;
use App\Models\UserOption;
use App\Models\Skill;
use App\Models\Post;
use App\Models\Page;
use App\Models\Notification;
use App\Models\InviteLink;
use App\Models\Comment;
use App\Models\Announcement;
use App\Ternobo;
use Illuminate\Support\Facades\DB;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        if ($this->app->environment('local')) {
            // $this->app->register(\Laravel\Telescope\TelescopeServiceProvider::class);
            // $this->app->register(TelescopeServiceProvider::class);
        }
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        TernoboWire::share(
            function () {
                return [
                    // Synchronously
                    'app' => [
                        'name' => Config::get('app.name'),
                    ],
                    "fullAccess" => Ternobo::isUserLogedIn() ? Auth::user()->personalPage->visible : false,
                    'direction' => App::getLocale() == "fa" ? 'rtl' : 'ltr',
                    "locale" => App::getLocale(),
                    "SEO" => SEOTools::generate(),
                    "announcements" => function () {
                        if (Auth::check()) {
                            $announcements = Announcement::query()
                                ->where(function ($query) {
                                    return $query->where("user_id", Auth::user()->id)
                                        ->orWhere("user_id", null);
                                })
                                ->whereRaw("not exists (select * from announcement_seen where user_id = ? and announcement_id = announcements.id)", [Auth::user()->id])
                                ->limit(1)
                                ->get();

                            foreach ($announcements as $announcement) {
                                DB::insert("insert into announcement_seen (user_id, announcement_id, created_at) values(?,?,?)", [Auth::user()->id, $announcement['id'], now()]);
                            }

                            return $announcements;
                        }
                        return [];
                    },
                    "connectedPeople" => function () {
                        // if (Auth::check()) {
                        //     return Auth::user()->getConnectionsIds();
                        // }
                        return [];
                    },
                    'unread_messages_count' => function () {
                        // if (Auth::check()) {
                        // return Auth::user()->conversations()->whereHas('messages', function ($query) {
                        //     $query->where("seen", false)->where("sender_id", "!=", Auth::user()->id);
                        // })->count();
                        // }
                        return 0;
                    },
                    "canDonate" => function () {
                        if (Auth::check()) {
                            $gateways = UserOption::getOption("payment_gateways", [
                                'paypal' => [
                                    'email' => '',
                                    'enabled' => false,
                                ],
                                'zarinpal' => [
                                    'merchant_id' => '',
                                    'enabled' => false,
                                ],
                            ], Auth::user()->id);

                            return $gateways['zarinpal']['enabled'];
                        }
                        return false;
                    },
                    'notifications_count' => function () {
                        if (Ternobo::isUserLogedIn() && Auth::user()->personalPage != null) {
                            return Notification::query()
                                ->where("created_at", ">=", Carbon::now()->subMonth())
                                ->whereHasMorph("notifiable", [Post::class, Skill::class, Comment::class, Page::class])
                                ->whereDoesntHave("seenNotification", function ($query) {
                                    $query->where("user_id", Auth::user()->id);
                                })
                                ->where("to", Auth::user()->personalPage->id)->count();
                        }
                        return 0;
                    },
                    'is_admin' => function () {
                        if (Auth::check()) {
                            return Auth::user()->is_admin == 1;
                        }
                        return false;
                    },
                    "waitingConnections" => function () {
                        // if (Auth::check()) {
                        //     return Auth::user()->getWaitingConnectionsIds();
                        // }
                        return [];
                    },
                    'invites_count' => function () {
                        if (Ternobo::isUserLogedIn() && Auth::user()->personalPage != null) {
                            return InviteLink::query()->where("user_id", Auth::user()->id)->where("valid", true)->count();
                        }
                        return 0;
                    },
                    'profile_steps' => function () {
                        if (Ternobo::isUserLogedIn() && Auth::user()->personalPage != null) {
                            return Auth::user()->getProfileSteps();
                        }
                        return [];
                    },
                    "currentPage" => function () {
                        if (Ternobo::isUserLogedIn() && Auth::user()->personalPage != null) {
                            return Cookie::get('ternobo_current_page_id') !== null ?
                                Page::query()
                                ->with("categories")
                                ->with("skills")
                                ->find(json_decode(Cookie::get('ternobo_current_page_id')))
                                :
                                Auth::user()->personalPage()
                                ->with("categories")
                                ->with("skills")
                                ->first();
                        }
                        return null;
                    },
                    "followings" => function () {
                        if (Ternobo::isUserLogedIn() && Auth::user()->personalPage != null) {
                            $followings = Auth::user()->followings;
                            $output = [];
                            foreach ($followings as $following) {
                                $output[] = $following->following;
                            }
                            return $output;
                        }
                        return [];
                    },
                ];
            }
        );
    }
}
