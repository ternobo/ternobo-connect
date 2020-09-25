<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\LocaleMiddleware;
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

    Route::get("/test", function (){
        $articles = App\Models\Post::query()->with("page")->where("type","article")->get();
        foreach($articles as $article){
            $article->cover = $article->getMedia();
            $article->save();
        }
        return response()->json($articles);
    });

    Route::group(['middleware'=>"auth"],function (){
        Route::get('/feed', 'HomeController@index')->name('home');
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
