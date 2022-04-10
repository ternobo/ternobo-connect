<?php

use Ternobo\TernoboWire\TernoboWire;
use Laravel\Passport\Passport;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Broadcast;
use App\Models\Post;
use App\Http\Middleware\WebAdminMiddleware;
use App\Http\Middleware\FullAccessUserMiddleware;
use App\Http\Middleware\FollowMiddlware;
use App\Http\Middleware\Authenticate;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\AutoUpdateController;
use App\Http\Middleware\CommunityTagSelectMiddleware;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;

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

Passport::routes();
TernoboWire::routes();
Broadcast::routes();

require base_path("routes/validation_routes.php");


Route::get("/refresh-csrf", "Controller@getCsrf");

Route::get('/ternobo-actions/update', [AutoUpdateController::class, "update"]);

Route::get("/report-reasons", [ReportController::class, "getReportOptions"]);
Route::get("/translations.js", "IndexController@translations");
require base_path("routes/sitemap_routes.php");
require base_path("routes/action_routes.php");
/**
 * File Access Start
 */
require base_path("routes/file_access.php");

/**
 * File Access End
 */

Route::get("/", "IndexController@index")->name("welcome")->middleware("guest");
Route::get("/set-language", "IndexController@setLanguage");
Route::any("/search", "Content\SearchController@index");
Route::get("/search/get", "Content\SearchController@search");

Route::get("/redirect", "RedirectController@redirect");

/**
 * Auth Start
 */
require base_path("routes/auth_routes.php");
/**
 * Auth End
 */

Route::middleware(["auth.web"])->group(function () {
    /**
     * Private Files
     */
    Route::get("/voices/{file}", "DownloadsController@voices");
    Route::get("/private-documents/{file}", "DownloadsController@privateDocuments");
    Route::get("/private-media/{file}", "DownloadsController@privateMedia");
    /**
     * Private Files End
     */

    Route::post("/ternobo-wire/check-online", "IndexController@checkOnline");
    Route::post("logout", "Auth\UsersController@logout");

    // Two Factor Authentication
    Route::prefix("/two-factor-auth")->group(function () {
        Route::post("info", "Auth\TwoFAController@get2FAInfo");

        Route::post("setup", "Auth\TwoFAController@setup");
        Route::post("enable", "Auth\TwoFAController@enableTwoFA");
        Route::post("reset", "Auth\TwoFAController@resetRecovery");

        Route::post("deactive", "Auth\TwoFAController@deactive");
    });

    // Follow Suggestion Page
    Route::get("/follow-people", "Auth\FollowSuggestionController@index")->middleware(FullAccessUserMiddleware::class);
    Route::post("/follow-people/get", "Auth\FollowSuggestionController@get")->middleware(FullAccessUserMiddleware::class);;

    // Profile
    Route::post("/setprofile", "Profile\ProfileController@setProfile")->name("profile-setup")->middleware(FullAccessUserMiddleware::class);

    // Follow Actions Start
    Route::post("/follow/{page_id}", "Profile\ConnectionsController@follow")->name("follow")->middleware(FullAccessUserMiddleware::class);
    Route::post("/unfollow/{page_id}", "Profile\ConnectionsController@unfollow")->middleware(FullAccessUserMiddleware::class);
    Route::post("/tags/{tag}/follow", "Content\TagsController@toggleFollowTag")->middleware(FullAccessUserMiddleware::class);
    //Follow Actions End

    Route::middleware([FollowMiddlware::class, CommunityTagSelectMiddleware::class])->group(function () {
        Route::get('/feed', 'Content\FeedController@index')->name('home');

        Route::post("/can-donate", "Donation\DontaionsController@canEnableDonate")->middleware(FullAccessUserMiddleware::class);

        // Seen Post
        Route::post("/seenPost", "PostController@seenPost");

        Route::get("/bookmarks", "Content\BookmarksController@bookmarks")->middleware(FullAccessUserMiddleware::class);

        // Request Verifiation
        Route::post("/verificationRequest", "Auth\UsersController@verificationRequest")->middleware(FullAccessUserMiddleware::class);

        Route::post("/mutual-friends", "Profile\PageController@getMutualFriends")->middleware(FullAccessUserMiddleware::class);

        Route::post("/slugsearch", "Profile\PageController@search")->middleware(FullAccessUserMiddleware::class);
        Route::get("/search/tags", "Content\TagsController@search")->middleware(FullAccessUserMiddleware::class);
        Route::get("/tags/detail", "Content\TagsController@getTag")->middleware(FullAccessUserMiddleware::class);

        Route::post("/setcover", "Profile\ProfileController@setCover")->name("profile-cover")->middleware(FullAccessUserMiddleware::class);

        Route::post("/delete-profile", "Profile\ProfileController@deleteProfileImage")->name("profile-delete")->middleware(FullAccessUserMiddleware::class);
        Route::post("/delete-cover", "Profile\ProfileController@deleteCoverImage")->name("cover-delete")->middleware(FullAccessUserMiddleware::class);

        Route::post("/like/{post_id}", "PostController@likePost");
        Route::post("/comments/{comment_id}/like", "CommentController@likeComment");

        // Connections
        // Route::get("/connections", "Profile\ConnectionsController@index");
        // Route::post("/connections", "Profile\ConnectionsController@getConnections");
        // Route::post("/connection/accept", "Profile\ConnectionsController@acceptRequest");
        // Route::post("/connection/delete", "Profile\ConnectionsController@removeConnectionRequest");
        // Route::post("/connect/{user_id}", "Profile\ConnectionsController@connectionRequest");
        // Route::post("/disconnect/{user_id}", "Profile\ConnectionsController@disconnect");

        //Start Page Edit
        Route::prefix('/save')->middleware(FullAccessUserMiddleware::class)->group(function () {
            Route::post("/resume", "Profile\ProfileController@saveAboutMe");
        });

        Route::prefix("/usersave")->middleware(FullAccessUserMiddleware::class)->group(function () {
            Route::post("/profile", "Profile\PageController@saveProfile");
            Route::post("/bio", "Profile\PageController@saveBio");
            Route::post("/shortbio", "Profile\PageController@saveShortBio");
            Route::post("/username", "Profile\PageController@saveUsername");
        });
        // End Page Edit

        // Route::prefix("/media")->group(function () {
        //     Route::post("/get", "Chats\ChatController@getMedia");
        // });

        // Start Comments
        Route::any("/comments/{comment:id}/replies", "CommentController@replies");
        Route::resource('posts.comments', "CommentController");
        // End Comments

        Route::post("/likes/get", "PostController@getLikes");

        Route::post("/reportpost", "PostController@report");

        Route::post("/reportpage", "Profile\PageController@report");

        // Settings Start
        Route::post("/change-password", "Auth\UsersController@changePassword");
        Route::post("/verifynewphone", "Auth\UsersController@verifyNewPhone");
        Route::post("/verifynewemail", "Auth\UsersController@verifyNewEmail");
        Route::post("/deactive", "Auth\UsersController@deactiveAccount");

        Route::post("/sessions", "Auth\SessionsController@getSessions");
        Route::delete("/sessions/{id}", "Auth\SessionsController@delete");
        //Settings End

        Route::post("/skills/search", "Skills\SkillController@search")->middleware(FullAccessUserMiddleware::class);;
        Route::post("/skills/can-credit", "Skills\SkillCreditController@checkCredit");
        Route::resource("skills.credit", "Skills\SkillCreditController");
        Route::resource("/skills/credit", "Skills\SkillCreditController");
        Route::post("/skills/sort/{id}", "Skills\SkillController@sort")->middleware(FullAccessUserMiddleware::class);;

        Route::post("/bookmark/{post_id}", "Content\BookmarksController@bookmarkPost")->middleware(FullAccessUserMiddleware::class);;

        require base_path("routes/settings_routes.php");

        Route::post("/reportpost", "PostController@report");

        Route::post("tags/delete", "Profile\PageController@removeTags")->middleware(FullAccessUserMiddleware::class);;
    });


    require base_path("routes/poll_routes.php");

    /**
     * Pages API
     */
    Route::prefix("/pages")->group(function () {
        Route::post('info', "Profile\PageController@getPageInfo");
        Route::post('posts', "Profile\PageController@getPosts");
        Route::post('save-resume', "PageController@saveResume");
    });
    /**
     * End Pages API
     */

    /**
     * Embed
     */
    Route::get("/embed-posts/{id}", "PostController@embedPost")->middleware(FullAccessUserMiddleware::class);;

    Route::post("/posts/{post:id}/embed", "PostController@getEmbed")->middleware(FullAccessUserMiddleware::class);;

    Route::post("/posts/{id}/publish", "PostController@publishPost")->middleware(FullAccessUserMiddleware::class);;

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

    Route::post("/categories/sort/{id}", "Profile\CategoryController@sort")->middleware(FullAccessUserMiddleware::class);;

    Route::resource("categories", "Profile\CategoryController")->middleware(FullAccessUserMiddleware::class);

    // Notifications
    Route::get('/notifications', 'NotificationController@index')->name('notifications')->middleware(FullAccessUserMiddleware::class);;
    Route::get('/notifications/get', 'NotificationController@get')->name('notifications')->middleware(FullAccessUserMiddleware::class);;

    // Start Idea Comments
    // Route::prefix("/feedbacks")->group(function () {
    //     Route::post("/bookmark", "Feedback\FeedbacksController@bookmark");
    //     Route::get("/myfeedbacks", "Feedback\FeedbacksController@myFeedback");
    //     Route::post("/reply/{feedback:id}", "Feedback\FeedbacksController@addReply");
    //     Route::delete("/reply/{id}", "Feedback\FeedbacksController@deleteComment");
    //     Route::post("/vote", "Feedback\FeedbacksController@voteFeedback");

    //     Route::post("/change-type", "Feedback\FeedbacksController@changeType")->middleware(WebAdminMiddleware::class);
    // });

    // Route::resource("/feedbacks", "Feedback\FeedbacksController");

    // Route::resource('feedbacks.replies', "Feedback\RepliesCotnroller");

    // Route::any("/feedback-replies/{id}/replies", "Feedback\RepliesCotnroller@replies");
    // Route::post("/feedback-replies/{id}/like", "Feedback\RepliesCotnroller@likeIdeaReply");
    // Route::post("/feedback-replies/{id}/pin", "Feedback\RepliesCotnroller@pinnReply");
    // End IdeaComments

    // Donations Start
    Route::get("/monetization", "Donation\DontaionsController@index")->middleware(FullAccessUserMiddleware::class);
    Route::post("/monetization", "Donation\DontaionsController@getDonations")->middleware(FullAccessUserMiddleware::class);
    Route::post("/monetization/settings", "Donation\DontaionsController@settings")->middleware(FullAccessUserMiddleware::class);
    Route::put("/monetization/settings", "Donation\DontaionsController@setPaymentGateways")->middleware(FullAccessUserMiddleware::class);

    // Get Donations list in Donate to post modal
    Route::post("/posts/{post}/monetization", "Donation\DontaionsController@getPostDonations");
    //End
    // Donations End

    //Conneted Accounts Actions
    // Google Start
    require(base_path('routes/oauth_applicatons.php'));
    // Google End

    // Connected Device Actions

    Route::get("/invite", "InviteLinksController@index")->middleware(FullAccessUserMiddleware::class);
});
//End Auth


Route::resource("/posts", "PostController")->only(['store', 'update', 'destroy', "show"]);

// Tags
Route::get("/tags/{name}", "Content\TagsController@index");
require base_path("routes/community_tags.php");

Route::middleware([WebAdminMiddleware::class])->prefix("management")->group(function () {
    require base_path("routes/management_rotues.php");
});

Route::post("/contact/contact-option", "Profile\ContactsController@getContactOptions");
Route::post("/contact/website-option", "Profile\ContactsController@getWebsiteOptions");
Route::post("/contact/social-option/{page_id}", "Profile\ContactsController@getSocialOptions");

Route::post("/contacts/", "Profile\ContactsController@saveData")->middleware(FullAccessUserMiddleware::class);;
Route::post("/contacts/{page}", "Profile\ContactsController@getContactData");

//monetization
require base_path("routes/tip_routes.php");



Route::get("/test-redis", function () {
    Redis::connection("default")->publish('ternobo_post_action', json_encode([
        'name' => 'Adam Wathan'
    ]));
});


// Pages
Route::prefix('/{page:slug}')->group(function () {

    Route::get("/{location?}", "Profile\PageController@show")->where("location", "about|activities|articles|contact");

    Route::post("/actions", "Profile\PageController@getActions");
    Route::post("/drafts", "Profile\PageController@getDrafts");

    Route::post("/followings", "Profile\ConnectionsController@followings");
    Route::post("/followings/tags", "Profile\ConnectionsController@followingTags");
    Route::post("/followers", "Profile\ConnectionsController@followers");
});
