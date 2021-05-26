<?php

use App\Http\Controllers\Admin\Tips\Transactions\TransactionsController;
use App\Http\Middleware\AdminAPIMiddleware;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

Route::post("/admin/login", "Admin\AdminController@login");

Route::middleware(["auth:api", AdminAPIMiddleware::class])->prefix("/admin")->group(function () {
    Route::post("/get-user", "Admin\AdminController@getUser");
    Route::resources([
        'reports' => 'Admin\ReportsController',
        'posts' => "Admin\PostsController",
    ]);

    Route::resource('users', "Admin\UsersController")->only(["store", 'update', "show", "index"]);
    Route::delete("/users/delete", "Admin\UsersController@forceDestory");
    Route::post("/users/deactive", "Admin\UsersController@deactiveMutiple");
    Route::post("/users/active", "Admin\UsersController@activeMultiple");

    Route::resource('notifications', "Admin\NotificationsController")->only(["store", "index"]);

    Route::resource("reports.notes", "Admin\ReportNotesController")->only("store", "destroy", "update");

    Route::resource('tags', "Admin\TagsController")->only(["index", "store"]);
    Route::delete("/tags/delete", "Admin\TagsController@destory");
    Route::resource('skills', "Admin\SkillsController")->only(["index"]);
    Route::delete("/skills/delete", "Admin\SkillsController@destory");

    Route::resource('transactions', TransactionsController::class)->only(['index', 'show']);

});
