<?php

use App\Http\Controllers\Admin\Tips\Transactions\TransactionsController;
use App\Http\Middleware\AdminAPIMiddleware;
use App\Http\Middleware\DataAccessMiddleware;
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
    Route::apiResources([
        'reports' => 'Admin\ReportsController',
        'posts' => "Admin\PostsController",
    ]);

    Route::apiResource('users', "Admin\UsersController")->only(["store", 'update', "show", "index"]);
    Route::delete("/users/delete", "Admin\UsersController@forceDestory");
    Route::post("/users/deactive", "Admin\UsersController@deactiveMutiple");
    Route::post("/users/active", "Admin\UsersController@activeMultiple");

    Route::apiResource('notifications', "Admin\NotificationsController")->only(["store", "index"]);

    Route::apiResource("reports.notes", "Admin\ReportNotesController")->only("store", "destroy", "update");

    Route::apiResource('tags', "Admin\TagsController")->only(["index", "store"]);
    Route::delete("/tags/delete", "Admin\TagsController@destory");
    Route::apiResource('skills', "Admin\SkillsController")->only(["index"]);
    Route::delete("/skills/delete", "Admin\SkillsController@destory");

    Route::apiResource('transactions', TransactionsController::class)->only(['index', 'show']);

    Route::apiResource("communities", "Management\CommunityController");

    Route::post("communities/add-category", "Management\CommunityController@createCategory");


    Route::post("communities/add-translation", "Management\CommunityController@addTranslation");
});



Route::middleware([DataAccessMiddleware::class])->group(function () {
    require(base_path("routes/extrenal_access_api.php"));
});
