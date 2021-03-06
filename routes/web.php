<?php

use App\Http\Middleware\FollowMiddlware;
use App\Http\Middleware\LocaleMiddleware;
use App\Models\Conversation;
use App\Models\Message;
use Illuminate\Support\Facades\Route;
use Ternobo\TernoboChat\Events\MessageEvent;
use Ternobo\TernoboWire\TernoboWire;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
 */

TernoboWire::routes();

Route::get('/sitemap.xml', 'SiteMapController@all');
Route::get('/sitemap-posts.xml', 'SiteMapController@posts');
Route::get('/sitemap-posts.xml', 'SiteMapController@posts');
Route::get('/sitemap-profiles.xml', 'SiteMapController@profiles');

/**
 * File Access Start
 */
Route::get("/profiles/{image}", "DownloadsController@profile");
Route::get("/medias/{image}", "DownloadsController@media");
/**
 * File Access End
 */

Route::get("/test", function () {
    $conversation = new Conversation();
    $conversation->members = json_encode([1516, 25]);
    $conversation->save();

    $message = new Message();
    $message->sender_id = 1;
    $message->sender_type = "App\Models\User";
    $message->conversation_id = $conversation->id;
    $message->type = "text";
    $message->text = "Hello Mio Mio" . time();
    $message->media = json_encode([null]);
    $message->meta = null;
    $message->save();
    dd(event(new MessageEvent($message)));

});

Route::group(['middleware' => LocaleMiddleware::class], function () {

    Route::get("/", "IndexController@index")->name("welcome");
    Route::any("/search", "HomeController@search");

    Route::resource("/articles", "ArticlesController");

    /**
     * Auth Start
     */
    Route::post("/rest-password", "Auth\ForgotPasswordController@resetPassword");
    Route::post("/updatepassword", "Auth\ForgotPasswordController@updatePassword");
    Route::prefix("/auth")->group(function () {
        Route::post('login', 'Auth\LoginController@login');
        Route::post('verify-tfa', 'Auth\LoginController@twoFactorVerify');

        Route::post('logout', 'Auth\LoginController@logout');
        Route::post('verification', 'Auth\UsersController@sendVcode');
        Route::post('verifycode', 'Auth\UsersController@verifyCode');
        Route::post("signup", "Auth\UsersController@signupUser");
        Route::post("setpassword", "Auth\UsersController@savePassword");

        /** Username Start */
        Route::post('/suggest-username', "Auth\SettingsController@suggest")->middleware("auth");
        Route::post('/set-username', "Auth\SettingsController@set")->middleware("auth");
        Route::post('/check-username', "Auth\SettingsController@check")->middleware("auth");
        /** Username End */

        /** Settings */
        Route::post("/get-info", "Auth\SettingsController@getUserInfo");
        Route::post("/verify-phone", "Auth\SettingsController@verifyNewPhone")->middleware("auth");
        Route::post("/verify-email", "Auth\SettingsController@verifyNewEmail")->middleware("auth");
        /** Settings End */

        /**
         * Password
         */
        Route::post("/change-password", "Auth\SettingsController@changePassword")->middleware("auth");

        // Deactive
        Route::post("/deactive", "Auth\SettingsController@deactiveAccount")->middleware("auth");
    });
    /**
     * Auth End
     */

    Route::group(['auth'], function () {

        Route::get("/voices/{file}", "DownloadsController@voices");
        Route::get("/private-documents/{file}", "DownloadsController@privateDocuments");
        Route::get("/private-media/{file}", "DownloadsController@privateMedia");

        Route::post("/ternobo-wire/check-online", "IndexController@checkOnline");
        Route::post("logout", "Auth\UsersController@logout");
        Route::prefix("/two-factor-auth")->group(function () {
            Route::post("info", "Auth\TwoFAController@get2FAInfo");

            Route::post("setup", "Auth\TwoFAController@setup");
            Route::post("enable", "Auth\TwoFAController@enableTwoFA");
            Route::post("reset", "Auth\TwoFAController@resetRecovery");

            Route::post("deactive", "Auth\TwoFAController@deactive");

        });

        Route::get("/follow-people", "IndexController@followSuggestions");

        // Follow Start
        Route::post("/follow/{page_id}", "ConnectionsController@follow")->name("follow");
        Route::post("/unfollow/{page_id}", "ConnectionsController@unfollow");
        //Follow End

        Route::middleware([FollowMiddlware::class, "auth"])->group(function () {
            Route::get('/feed', 'HomeController@index')->name('home');
            Route::post("/seenPost", "PostController@seenPost");
            Route::get("/bookmarks", "HomeController@bookmarks");
            Route::post("/verificationRequest", "Auth\UsersController@verificationRequest");

            Route::post("/mutual-friends", "PageController@getMutualFriends");

            Route::post("/slugsearch", "PageController@search");

            Route::get("/gettags", "PostController@getTags");

            Route::post("/setprofile", "Auth\UsersController@setProfile")->name("profile-setup");
            Route::post("/setcover", "Auth\UsersController@setCover")->name("profile-cover");

            Route::post("/like/{post_id}", "PostController@likePost");
            Route::post("/comments/{comment_id}/like", "CommentController@likeComment");

            // Connections
            Route::get("/connections", "ConnectionsController@index");
            Route::post("/connections", "ConnectionsController@getConnections");
            Route::post("/connection/accept", "ConnectionsController@acceptRequest");
            Route::post("/connection/delete", "ConnectionsController@removeConnectionRequest");
            Route::post("/connect/{user_id}", "ConnectionsController@connectionRequest");
            Route::post("/disconnect/{user_id}", "ConnectionsController@disconnect");

            // Follows
            Route::get("/followings", "ConnectionsController@followings");
            Route::get("/followers", "ConnectionsController@followers");
            //end Connections

            //Start Page Edit
            Route::prefix('/save')->group(function () {
                Route::post("/resume", "ProfileController@saveAboutMe");
            });
            Route::prefix("/usersave")->group(function () {
                Route::post("/profile", "PageController@saveProfile");
                Route::post("/bio", "PageController@saveBio");
                Route::post("/shortbio", "PageController@saveShortBio");
                Route::post("/username", "PageController@saveUsername");
            });
            // End Page Edit

            Route::prefix("/media")->group(function () {
                Route::post("/get", "Chats\ChatController@getMedia");
            });

            // Start Comments
            Route::any("/comments/{comment:id}/replies", "CommentController@replies");
            Route::resource('posts.comments', "CommentController");
            // End Comments

            Route::post("/likes/get", "PostController@getLikes");

            Route::post("/reportpost", "PostController@report");

            Route::post("/reportpage", "PageController@report");

            // Settings Start
            Route::post("/change-password", "Auth\UsersController@changePassword");
            Route::post("/verifynewphone", "Auth\UsersController@verifyNewPhone");
            Route::post("/verifynewemail", "Auth\UsersController@verifyNewEmail");
            Route::post("/deactive", "Auth\UsersController@deactiveAccount");

            Route::post("/sessions", "Auth\SessionsController@getSessions");
            Route::delete("/sessions/{id}", "Auth\SessionsController@delete");
            //Settings End

            Route::post("/skills/search", "Skills\SkillController@search");
            Route::post("/skills/can-credit", "Skills\SkillCreditController@checkCredit");
            Route::resource("/skills/credit", "Skills\SkillCreditController");
            Route::post("/skills/sort/{id}", "Skills\SkillController@sort");

            Route::post("/bookmark/{post_id}", "PostController@bookmarkPost");

            Route::prefix("/ideas")->group(function () {
                Route::post("/bookmark", "IdeasController@bookmark");
                Route::get("/myideas", "IdeasController@myIdeas");
                Route::post("/reply/{idea:id}", "IdeasController@addReply");
                Route::delete("/reply/{id}", "IdeasController@deleteComment");
                Route::post("/vote", "IdeasController@voteIdea");
            });

            Route::resource("/ideas", "IdeasController");

            Route::get("/settings", "Auth\UsersController@settingsPage");

            Route::post("/reportpost", "PostController@report");

            Route::post("tags/delete", "PageController@removeTags");
        });

        /**
         * Pages API
         */
        Route::prefix("/pages")->group(function () {
            Route::post('info', "PageController@getPageInfo");
            Route::post('posts', "PageController@getPosts");
            Route::resource("categories", "CategoryController");

            Route::post('save-resume', "PageController@saveResume");

        });
        /**
         * End Pages API
         */

        /**
         * Embed
         */
        Route::get("/embed-posts/{id}", "PostController@embedPost");

        Route::post("/posts/{post:id}/embed", "PostController@getEmbed");

        Route::resource("/posts", "PostController");

        Route::post("/categories/sort/{id}", "CategoryController@sort");

        Route::resource("categories", "CategoryController");

        // Notifications
        Route::get('/notifications', 'NotificationController@index')->name('notifications');

        // Start Idea Comments
        Route::any("/idea-replies/{id}/replies", "Ideas\RepliesCotnroller@replies");
        Route::post("/idea-replies/{id}/like", "Ideas\RepliesCotnroller@likeIdeaReply");

        Route::resource('ideas.replies', "Ideas\RepliesCotnroller");
        // End Comments

    });

    Route::post("/share/{post_id}", "PostController@sharePost");

    Route::get("/tags/{name}", "HomeController@tag");

    Route::post("/contact/contact-option", "ContactsController@getContactOptions");
    Route::post("/contact/website-option", "ContactsController@getWebsiteOptions");
    Route::post("/contact/social-option", "ContactsController@getSocialOptions");

    Route::post("/contacts/", "ContactsController@saveData");
    Route::post("/contacts/{page}", "ContactsController@getContactData");

    //Chats
    Route::prefix("chats")->group(function () {
        Route::get("/", "Chats\ChatController@index");
        Route::post("/", "Chats\ChatController@getChats");
        Route::post("/search", "Chats\ChatController@search");
        Route::post("/conversations/{id}", "Chats\ChatController@chat");
        Route::post("/conversations/{id}/mute", "Chats\ChatController@muteChat");

        Route::post("/conversations/create/{id}", "Chats\ChatController@createConversation");

        Route::post("/send-message", "Chats\ChatController@sendMessage");

    });

    // Pages
    Route::prefix('/{page:slug}')->group(function () {

        Route::get("/{location?}", "PageController@show")->where("location", "about|activities|articles|contact");

        Route::post("/actions", "PageController@getActions");
        Route::post("/tags", "PageController@getTags");

        Route::get("/{post}", "ArticlesController@show");
    });

});
