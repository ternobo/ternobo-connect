<?php

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

    Route::get("/", "IndexController@index");

    Route::get("/test", function () {
        $articles = App\Models\Post::query()->with("page")->where("type", "article")->get();
        foreach ($articles as $article) {
            $article->cover = $article->getMedia();
            $article->save();
        }
        return response()->json($articles);
    });

/**
 * Auth Start
 */
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
        Route::get('/feed', 'HomeController@index')->name('home');
        Route::post("/seenPost", "PostController@seenPost");
        Route::get("/bookmarks", "HomeController@bookmarks");

        Route::post("/verificationRequest", "Auth\UsersController@verificationRequest");

        Route::post("/setprofile", "Auth\UsersController@setProfile")->name("profile-setup");
        Route::post("/setcover", "Auth\UsersController@setCover")->name("profile-cover");

        Route::post("/like/{post_id}", "PostController@likePost");
        Route::post("/likecomment/{comment_id}", "CommentController@likeComment");

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

        Route::post("/reportpost", "PostController@report");

        // Settings Start
        Route::post("/change-password", "Auth\UsersController@changePassword");
        Route::post("/verifynewphone", "Auth\UsersController@verifyNewPhone");
        Route::post("/verifynewemail", "Auth\UsersController@verifyNewEmail");
        Route::post("/deactive", "Auth\UsersController@deactiveAccount");
        //Settings End

        Route::post("/categories/sort/{id}", "CategoryController@sort");

        Route::post("/skills/search", "SkillController@search");
        Route::resource("/skills", "SkillController");
        Route::resource("/skills/credit", "SkillCreditController");
        Route::post("/skills/sort/{id}", "SkillController@sort");

        Route::prefix("/ideas")->group(function () {
            Route::post("/bookmark", "IdeasController@bookmark");
            Route::get("/myideas", "IdeasController@myIdeas");
            Route::post("/reply/{idea:id}", "IdeasController@addReply");
            Route::delete("/reply/{id}", "IdeasController@deleteComment");
            Route::post("/vote", "IdeasController@voteIdea");
        });

        Route::resource("/ideas", "IdeasController");

    });

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

    // Pages
    Route::prefix('/{page:slug}')->group(function () {

        Route::get("/{location?}", "PageController@show")->where("location", "activities|articles|contact");

        Route::prefix('/category/{id}')->group(function () {
            Route::get("/{location?}", "PageController@getCategory");
        });

        Route::get("/{post}", "ArticlesController@show");
    });

});
