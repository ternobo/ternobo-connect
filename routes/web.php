<?php

use App\Http\Middleware\FollowMiddlware;
use App\Http\Middleware\LocaleMiddleware;
use Illuminate\Support\Facades\Route;

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

/**
 * File Access Start
 */
Route::get("/profiles/{image}", "DownloadsController@profile");
Route::get("/medias/{image}", "DownloadsController@media");
Route::get("/nationalcards/{image}", "DownloadsController@nationalCards");
/**
 * File Access End
 */



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
        Route::post('logout', 'Auth\LoginController@logout');
        Route::post('verification', 'Auth\UsersController@sendVcode');
        Route::post('verifycode', 'Auth\UsersController@verifyCode');
        Route::post("signup", "Auth\UsersController@signupUser");
        Route::post("setpassword", "Auth\UsersController@savePassword");
    });
    /**
     * Auth End
     */

    Route::group(['auth'], function () {


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

            Route::post("/setprofile", "Auth\UsersController@setProfile")->name("profile-setup");
            Route::post("/setcover", "Auth\UsersController@setCover")->name("profile-cover");

            Route::post("/like/{post_id}", "PostController@likePost");
            Route::post("/comments/{comment_id}/like", "CommentController@likeComment");

            // Connections
            Route::get("/connections", "ConnectionsController@index");
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
                Route::post("/contacts", "PageController@saveContacts");
                Route::post("/socials", "PageController@saveSocials");
                Route::post("/websites", "PageController@saveWebsits");
            });
            Route::prefix("/usersave")->group(function () {
                Route::post("/profile", "PageController@saveProfile");
                Route::post("/bio", "PageController@saveBio");
                Route::post("/shortbio", "PageController@saveShortBio");
                Route::post("/username", "PageController@saveUsername");
            });
            // End Page Edit

            // Start Comments
            Route::any("/comments/{comment:id}/replies", "CommentController@replies");
            Route::resource('posts.comments', "CommentController");

            // End Comments

            Route::post("/reportpost", "PostController@report");

            // Settings Start
            Route::post("/change-password", "Auth\UsersController@changePassword");
            Route::post("/verifynewphone", "Auth\UsersController@verifyNewPhone");
            Route::post("/verifynewemail", "Auth\UsersController@verifyNewEmail");
            Route::post("/deactive", "Auth\UsersController@deactiveAccount");
            //Settings End

            Route::post("/skills/search", "SkillController@search");
            Route::resource("/skills", "SkillController");
            Route::resource("/skills/credit", "SkillCreditController");
            Route::post("/skills/sort/{id}", "SkillController@sort");

            Route::post("/bookmark/{post_id}", "PostController@bookmarkPost");

            Route::prefix("/ideas")->group(function () {
                Route::post("/bookmark", "IdeasController@bookmark");
                Route::get("/myideas", "IdeasController@myIdeas");
                Route::post("/reply/{idea:id}", "IdeasController@addReply");
                Route::delete("/reply/{id}", "IdeasController@deleteComment");
                Route::post("/vote", "IdeasController@voteIdea");
            });

            Route::resource("/ideas", "IdeasController");

        });

        Route::get("/settings", "Auth\UsersController@settingsPage");

        /**
         * Pages API
         */
        Route::prefix("/pages")->group(function () {
            Route::post('info', "PageController@getPageInfo");
            Route::post('posts', "PageController@getPosts");
            Route::resource("categories", "CategoryController");
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


    });

    Route::post("/share/{post_id}", "PostController@sharePost");

    Route::get("/tags/{name}", "HomeController@tag");


    // Pages
    Route::prefix('/{page:slug}')->group(function () {

        Route::get("/{location?}", "PageController@show")->where("location", "about|activities|articles|contact");

        Route::prefix('/category/{id}')->group(function () {
            Route::get("/{location?}", "PageController@getCategory");
        });

        Route::get("/{post}", "ArticlesController@show");
    });

});
