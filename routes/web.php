<?php

use Ternobo\TernoboWire\TernoboWire;
use Laravel\Passport\Passport;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Broadcast;
use App\Models\User;
use App\Models\Post;
use App\Http\Middleware\FullAccessUserMiddleware;
use App\Http\Middleware\FollowMiddlware;
use App\Http\Middleware\CommunityTagSelectMiddleware;
use App\Http\Middleware\Authenticate;
use App\Http\Controllers\Skills\SkillCreditController;
use App\Http\Controllers\Skills\SkillController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\RedirectController;
use App\Http\Controllers\Profile\ProfileController;
use App\Http\Controllers\Profile\PageController;
use App\Http\Controllers\Profile\ContactsController;
use App\Http\Controllers\Profile\ConnectionsController;
use App\Http\Controllers\Profile\CategoryController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\InviteLinksController;
use App\Http\Controllers\IndexController;
use App\Http\Controllers\DownloadsController;
use App\Http\Controllers\Donation\DontaionsController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Content\TagsController;
use App\Http\Controllers\Content\SearchController;
use App\Http\Controllers\Content\FeedController;
use App\Http\Controllers\Content\BookmarksController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\Chats\ChatController;
use App\Http\Controllers\AutoUpdateController;
use App\Http\Controllers\Auth\UsersController;
use App\Http\Controllers\Auth\TwoFAController;
use App\Http\Controllers\Auth\SessionsController;
use App\Http\Controllers\Auth\FollowSuggestionController;

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


Route::get("/refresh-csrf", [Controller::class, "getCsrf"]);

Route::get('/ternobo-actions/update', [AutoUpdateController::class, "update"]);

Route::get("/report-reasons", [ReportController::class, "getReportOptions"]);
Route::get("/translations.js", [IndexController::class, "translations"]);
require base_path("routes/sitemap_routes.php");
require base_path("routes/action_routes.php");

/**
 * File Access Start
 */
require base_path("routes/file_access.php");

/**
 * File Access End
 */

Route::get("/", [IndexController::class, "index"])->name("welcome")->middleware("guest");
Route::get("/set-language", [IndexController::class, "setLanguage"]);
Route::any("/search", [SearchController::class, "index"]);
Route::get("/search/get", [SearchController::class, "search"]);

Route::get("/redirect", [RedirectController::class, "redirect"]);

/**
 * Auth Start
 */
require base_path("routes/auth_routes.php");
/**
 * Auth End
 */

Route::middleware(["auth.web"])->group(function () {

    require base_path("routes/download_routes.php");

    Route::post("/ternobo-wire/check-online", [IndexController::class, "checkOnline"]);
    Route::post("logout", [UsersController::class, "logout"]);

    // Two Factor Authentication
    Route::prefix("/two-factor-auth")->group(function () {
        Route::post("info", [TwoFAController::class, "get2FAInfo"]);

        Route::post("setup", [TwoFAController::class, "setup"]);
        Route::post("enable", [TwoFAController::class, "enableTwoFA"]);
        Route::post("reset", [TwoFAController::class, "resetRecovery"]);

        Route::post("deactive", [TwoFAController::class, "deactive"]);
    });
    // ********************* 

    // Follow Suggestion Page
    Route::get("/follow-people", [FollowSuggestionController::class, "index"])->middleware(FullAccessUserMiddleware::class);
    Route::post("/follow-people/get", [FollowSuggestionController::class, "get"])->middleware(FullAccessUserMiddleware::class);;
    // **********************************

    // Profile
    Route::post("/setprofile", [ProfileController::class, "setProfile"])->middleware(FullAccessUserMiddleware::class);

    // Follow Actions Start
    Route::post("/follow/{page_id}", [ConnectionsController::class, "follow"])->middleware(FullAccessUserMiddleware::class);
    Route::post("/unfollow/{page_id}", [ConnectionsController::class, "unfollow"])->middleware(FullAccessUserMiddleware::class);
    Route::post("/tags/{tag}/follow", [TagsController::class, "toggleFollowTag"])->middleware(FullAccessUserMiddleware::class);
    //Follow Actions End

    Route::middleware([FollowMiddlware::class, CommunityTagSelectMiddleware::class])->group(function () {
        Route::get('/feed', [FeedController::class, "index"])->name('feed');

        Route::post("/can-donate", [DontaionsController::class, "canEnableDonate"])->middleware(FullAccessUserMiddleware::class);

        // Seen Post
        Route::post("/seenPost", [PostController::class, "seenPost"]);

        Route::get("/bookmarks", [BookmarksController::class, "bookmarks"])->middleware(FullAccessUserMiddleware::class);

        // Request Verifiation
        Route::post("/verificationRequest", [UsersController::class, "verificationRequest"])->middleware(FullAccessUserMiddleware::class);

        Route::post("/mutual-friends", [PageController::class, "getMutualFriends"])->middleware(FullAccessUserMiddleware::class);

        Route::post("/slugsearch", [PageController::class, "search"])->middleware(FullAccessUserMiddleware::class);
        Route::get("/search/tags", [TagsController::class, "search"])->middleware(FullAccessUserMiddleware::class);
        Route::get("/tags/detail", [TagsController::class, "getTag"])->middleware(FullAccessUserMiddleware::class);

        Route::post("/setcover", [ProfileController::class, "setCover"])->middleware(FullAccessUserMiddleware::class);

        Route::post("/delete-profile", [ProfileController::class, "deleteProfileImage"])->middleware(FullAccessUserMiddleware::class);
        Route::post("/delete-cover", [ProfileController::class, "deleteCoverImage"])->middleware(FullAccessUserMiddleware::class);

        Route::post("/like/{post_id}", [PostController::class, "likePost"]);
        Route::post("/comments/{comment_id}/like", [CommentController::class, "likeComment"]);

        //Start Page Edit
        Route::prefix('/save')->middleware(FullAccessUserMiddleware::class)->group(function () {
            Route::post("/resume", [ProfileController::class, "saveAboutMe"]);
        });

        Route::prefix("/usersave")->middleware(FullAccessUserMiddleware::class)->group(function () {
            Route::post("/profile", [PageController::class, "saveProfile"]);
            Route::post("/bio", [PageController::class, "saveBio"]);
            Route::post("/shortbio", [PageController::class, "saveShortBio"]);
            Route::post("/username", [PageController::class, "saveUsername"]);
        });
        // End Page Edit

        // Start Comments
        Route::any("/comments/{comment:id}/replies", [CommentController::class, "replies"]);
        Route::resource('posts.comments', CommentController::class);
        // End Comments

        Route::post("/likes/get", [PostController::class, "getLikes"]);

        Route::post("/reportpost", [PostController::class, "report"]);

        Route::post("/reportpage", [PageController::class, "report"]);

        // Settings Start
        Route::post("/change-password", [UsersController::class, "changePassword"]);
        Route::post("/verifynewphone", [UsersController::class, "verifyNewPhone"]);
        Route::post("/verifynewemail", [UsersController::class, "verifyNewEmail"]);
        Route::post("/deactive", [UsersController::class, "deactiveAccount"]);

        Route::post("/sessions", [SessionsController::class, "getSessions"]);
        Route::delete("/sessions/{id}", [SessionsController::class, "delete"]);
        //Settings End

        Route::post("/skills/search", [SkillController::class, "search"])->middleware(FullAccessUserMiddleware::class);;
        Route::post("/skills/can-credit", [SkillCreditController::class, "checkCredit"]);
        Route::resource("skills.credit", SkillCreditController::class);
        Route::resource("/skills/credit", SkillCreditController::class);
        Route::post("/skills/sort/{id}", [SkillController::class, "sort"])->middleware(FullAccessUserMiddleware::class);;

        Route::post("/bookmark/{post_id}", [BookmarksController::class, "bookmarkPost"])->middleware(FullAccessUserMiddleware::class);;

        require base_path("routes/settings_routes.php");

        Route::post("/reportpost", [PostController::class, "report"]);

        Route::post("tags/delete", [PageController::class, "removeTags"])->middleware(FullAccessUserMiddleware::class);;
    });


    require base_path("routes/poll_routes.php");

    /**
     * Pages API
     */
    Route::prefix("/pages")->group(function () {
        Route::post('info', [PageController::class, "getPageInfo"]);
        Route::post('posts', [PageController::class, "getPosts"]);
        Route::post('save-resume', [PageController::class, "saveResume"]);
    });
    /**
     * End Pages API
     */

    /**
     * Embed
     */
    Route::get("/embed-posts/{id}", [PostController::class, "embedPost"])->middleware(FullAccessUserMiddleware::class);;

    Route::post("/posts/{post:id}/embed", [PostController::class, "getEmbed"])->middleware(FullAccessUserMiddleware::class);;

    Route::post("/posts/{id}/publish", [PostController::class, "publishPost"])->middleware(FullAccessUserMiddleware::class);;

    //Chats
    if (config("features.chat")) {
        require base_path("routes/chat_routes.php");
    }

    Route::post("/categories/sort/{id}", [CategoryController::class, "sort"])->middleware(FullAccessUserMiddleware::class);;
    Route::resource("categories", CategoryController::class)->middleware(FullAccessUserMiddleware::class);

    // Notifications
    Route::get('/notifications', [NotificationController::class, "index"])->name('notifications')->middleware(FullAccessUserMiddleware::class);;
    Route::get('/notifications/get', [NotificationController::class, "get"])->name('notifications.get')->middleware(FullAccessUserMiddleware::class);;

    // Start Idea Comments
    if (config("features.chat")) {
        require base_path("routes/feedback_routes.php");
    }
    // End IdeaComments

    // Donations Start
    if (config("features.monitization")) {
        require base_path("routes/monetization_routes.php");
    }
    // Donations End

    //Conneted Accounts Actions
    // Google Start
    require(base_path('routes/oauth_applicatons.php'));
    // Google End

    // Connected Device Actions

    Route::get("/invite", [InviteLinksController::class, "index"])->middleware(FullAccessUserMiddleware::class);
});
//End Auth


Route::resource("/posts", PostController::class)->only(['store', 'update', 'destroy', "show"]);

// Tags
if (config("features.tags")) {
    Route::get("/tags/{name}", [TagsController::class, "index"]);
}

if (config("features.communities")) {
    require base_path("routes/community_tags.php");
}

if (config("features.profile.contact")) {
    Route::post("/contact/contact-option", [ContactsController::class, "getContactOptions"]);
    Route::post("/contact/website-option", [ContactsController::class, "getWebsiteOptions"]);
    Route::post("/contact/social-option/{page_id}", [ContactsController::class, "getSocialOptions"]);

    Route::post("/contacts/", [ContactsController::class, "saveData"])->middleware(FullAccessUserMiddleware::class);;
    Route::post("/contacts/{page}", [ContactsController::class, "getContactData"]);
}

//monetization
if (config("features.chat")) {
    require base_path("routes/tip_routes.php");
}
// Pages
Route::prefix('/{page:slug}')->group(function () {

    Route::get("/{location?}", [PageController::class, "show"])->where("location", "about|activities|articles|contact");

    Route::post("/actions", [PageController::class, "getActions"]);
    Route::post("/drafts", [PageController::class, "getDrafts"]);

    Route::post("/followings", [ConnectionsController::class, "followings"]);
    Route::post("/followings/tags", [ConnectionsController::class, "followingTags"]);
    Route::post("/followers", [ConnectionsController::class, "followers"]);
});
