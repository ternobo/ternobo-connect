<?php

namespace App\Providers;

use App\Models\Comment;
use App\Models\Notification;
use App\Models\Page;
use App\Models\Post;
use App\Models\Skill;
use Artesaos\SEOTools\Facades\SEOTools;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\ServiceProvider;
use Ternobo\TernoboWire\TernoboWire;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {

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
                    "SEO" => SEOTools::generate(),
                    "connectedPeople" => function () {
                        if (Auth::check()) {
                            // return Auth::user()->getConnectionsIds();
                        }
                        return [];
                    },
                    'unread_messages_count' => function () {
                        if (Auth::check()) {
                            // return Auth::user()->conversations()->whereHas('messages', function ($query) {
                            //     $query->where("seen", false)->where("sender_id", "!=", Auth::user()->id);
                            // })->count();
                        }
                        return 0;
                    },
                    'notifications_count' => function () {
                        if (Auth::check()) {
                            return count(Notification::query()
                                    ->whereHasMorph("notifiable", [Post::class, Skill::class, Comment::class, Page::class])
                                    ->where("seen", false)
                                    ->where("to", Auth::user()->personalPage->id)->get());
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
                        if (Auth::check()) {
                            // return Auth::user()->getWaitingConnectionsIds();
                        }
                        return [];
                    },

                    'profile_steps' => function () {
                        if (Auth::check()) {
                            return Auth::user()->getProfileSteps();
                        }
                        return [];
                    },
                    "currentPage" => function () {
                        if (Auth::check()) {
                            $current_page = Cookie::get('ternobo_current_page_id') !== null ?
                            Page::query()
                                ->with("categories")
                                ->with("skills")
                                ->find(json_decode(Cookie::get('ternobo_current_page_id'))) :
                            Auth::user()->personalPage()
                                ->with("categories")
                                ->with("skills")
                                ->first();
                            return $current_page;
                        }
                        return null;

                    },
                    "followings" => function () {
                        if (Auth::check()) {
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
