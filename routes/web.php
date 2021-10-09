<?php

use App\Http\Middleware\Authenticate;
use App\Http\Middleware\FollowMiddlware;
use App\Http\Middleware\WebAdminMiddleware;
use App\Models\Post;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Route;
use Laravel\Passport\Passport;
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

Passport::routes();
TernoboWire::routes();
Broadcast::routes();
Route::get("/refresh-csrf", "Controller@getCsrf");

Route::post('/ternobo-actions/update', "AutoUpdateController@update");

Route::get("/report-reasons", "ReportController@getReportOptions");
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
Route::any("/search", "Content\SearchController@search");

Route::get("/register", "Auth\RegisterController@index");

Route::get("/redirect", "RedirectController@redirect");

/**
 * Auth Start
 */
require base_path("routes/auth_routes.php");
/**
 * Auth End
 */

Route::middleware([Authenticate::class])->group(function () {
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
    Route::get("/follow-people", "Auth\FollowSuggestionController@index");
    Route::post("/follow-people/get", "Auth\FollowSuggestionController@get");

    Route::post("/setprofile", "Profile\ProfileController@setProfile")->name("profile-setup");

    // Follow Actions Start
    Route::post("/follow/{page_id}", "Profile\ConnectionsController@follow")->name("follow");
    Route::post("/unfollow/{page_id}", "Profile\ConnectionsController@unfollow");
    Route::post("/tags/{tag}/follow", "Content\TagsController@toggleFollowTag");
    //Follow Actions End

    Route::middleware([FollowMiddlware::class])->group(function () {
        Route::get('/feed', 'Content\FeedController@index')->name('home');

        Route::post("/can-donate", "Donation\DontaionsController@canEnableDonate");

        // Seen Post
        Route::post("/seenPost", "PostController@seenPost");

        Route::get("/bookmarks", "Content\BookmarksController@bookmarks");

        // Request Verifiation
        Route::post("/verificationRequest", "Auth\UsersController@verificationRequest");

        Route::post("/mutual-friends", "Profile\PageController@getMutualFriends");

        Route::post("/slugsearch", "Profile\PageController@search");

        Route::get("/gettags", "PostController@getTags");

        Route::post("/setcover", "Profile\ProfileController@setCover")->name("profile-cover");

        Route::post("/delete-profile", "Profile\ProfileController@deleteProfileImage")->name("profile-delete");
        Route::post("/delete-cover", "Profile\ProfileController@deleteCoverImage")->name("profile-delete");

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
        Route::prefix('/save')->group(function () {
            Route::post("/resume", "Profile\ProfileController@saveAboutMe");
        });

        Route::prefix("/usersave")->group(function () {
            Route::post("/profile", "Profile\PageController@saveProfile");
            Route::post("/bio", "Profile\PageController@saveBio");
            Route::post("/shortbio", "Profile\PageController@saveShortBio");
            Route::post("/username", "Profile\PageController@saveUsername");
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

        Route::post("/reportpage", "Profile\PageController@report");

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
        Route::resource("skills.credit", "Skills\SkillCreditController");
        Route::resource("/skills/credit", "Skills\SkillCreditController");
        Route::post("/skills/sort/{id}", "Skills\SkillController@sort");

        Route::post("/bookmark/{post_id}", "Content\BookmarksController@bookmarkPost");

        require base_path("routes/settings_routes.php");

        Route::post("/reportpost", "PostController@report");

        Route::post("tags/delete", "Profile\PageController@removeTags");
    });


    require base_path("routes/poll_routes.php");

    /**
     * Pages API
     */
    Route::prefix("/pages")->group(function () {
        Route::post('info', "Profile\PageController@getPageInfo");
        Route::post('posts', "Profile\PageController@getPosts");
        Route::resource("categories", "Profile\CategoryController");

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

    Route::post("/posts/{id}/publish", "PostController@publishPost");

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

    Route::post("/share/{post_id}", "PostController@sharePost");

    Route::post("/categories/sort/{id}", "Profile\CategoryController@sort");

    Route::resource("categories", "Profile\CategoryController");

    // Notifications
    Route::get('/notifications', 'NotificationController@index')->name('notifications');

    // Start Idea Comments

    Route::prefix("/feedbacks")->group(function () {
        Route::post("/bookmark", "Feedback\FeedbacksController@bookmark");
        Route::get("/myfeedbacks", "Feedback\FeedbacksController@myFeedback");
        Route::post("/reply/{feedback:id}", "Feedback\FeedbacksController@addReply");
        Route::delete("/reply/{id}", "Feedback\FeedbacksController@deleteComment");
        Route::post("/vote", "Feedback\FeedbacksController@voteFeedback");

        Route::post("/change-type", "Feedback\FeedbacksController@changeType")->middleware(WebAdminMiddleware::class);
    });

    Route::resource("/feedbacks", "Feedback\FeedbacksController");

    Route::resource('feedbacks.replies', "Feedback\RepliesCotnroller");

    Route::any("/feedback-replies/{id}/replies", "Feedback\RepliesCotnroller@replies");
    Route::post("/feedback-replies/{id}/like", "Feedback\RepliesCotnroller@likeIdeaReply");
    Route::post("/feedback-replies/{id}/pin", "Feedback\RepliesCotnroller@pinnReply");
    // End IdeaComments

    // Donations Start
    Route::get("/tips", "Donation\DontaionsController@index");
    Route::post("/tips", "Donation\DontaionsController@getDonations");
    Route::post("/tips/settings", "Donation\DontaionsController@settings");
    Route::put("/tips/settings", "Donation\DontaionsController@setPaymentGateways");

    // Get Donations list in Donate to post modal
    Route::post("/posts/{post}/tips", "Donation\DontaionsController@getPostDonations");
    //End
    // Donations End

    //Conneted Accounts Actions
    // Google Start
    require(base_path('routes/oauth_applicatons.php'));
    // Google End

    // Connected Device Actions

    Route::get("/invite", "InviteLinksController@index");
});
//End Auth


Route::resource("/posts", "PostController")->only(['store', 'update', 'destroy', "show"]);

Route::get("/tags/{name}", "Content\TagsController@index");

Route::post("/contact/contact-option", "Profile\ContactsController@getContactOptions");
Route::post("/contact/website-option", "Profile\ContactsController@getWebsiteOptions");
Route::post("/contact/social-option/{page_id}", "Profile\ContactsController@getSocialOptions");

Route::post("/contacts/", "Profile\ContactsController@saveData");
Route::post("/contacts/{page}", "Profile\ContactsController@getContactData");

//Tips
require base_path("routes/tip_routes.php");

// Pages
Route::prefix('/{page:slug}')->group(function () {

    Route::get("/{location?}", "Profile\PageController@show")->where("location", "about|activities|articles|contact");

    Route::post("/actions", "Profile\PageController@getActions");
    Route::post("/drafts", "Profile\PageController@getDrafts");
    Route::post("/tags", "Profile\PageController@getTags");

    Route::post("/followings", "Profile\ConnectionsController@followings");
    Route::post("/followers", "Profile\ConnectionsController@followers");
});
