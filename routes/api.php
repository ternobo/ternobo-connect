<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\Community\CommunityCategoriesController;
use App\Http\Controllers\Admin\Community\CommunityController;
use App\Http\Controllers\Admin\NotificationsController;
use App\Http\Controllers\Admin\PostsController;
use App\Http\Controllers\Admin\ReportNotesController;
use App\Http\Controllers\Admin\ReportsController;
use App\Http\Controllers\Admin\SkillsController;
use App\Http\Controllers\Admin\TagsController;
use App\Http\Controllers\Admin\Tips\Transactions\TransactionsController;
use App\Http\Controllers\Admin\UsersController;
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

Route::post("/admin/login", [AdminController::class, "login"]);

Route::middleware(["auth:api", AdminAPIMiddleware::class, 'cors'])->prefix("/admin")->group(function () {
    Route::post("/get-user", [AdminController::class, "getUser"]);
    Route::apiResources([
        'reports' => ReportsController::class,
        'posts' => PostsController::class,
    ]);

    Route::apiResource('users', UsersController::class)->only(["store", 'update', "show", "index"]);
    Route::delete("/users/delete", [UsersController::class, "forceDestory"]);
    Route::post("/users/deactive", [UsersController::class, "deactiveMutiple"]);
    Route::post("/users/active", [UsersController::class, "activeMultiple"]);

    Route::apiResource('notifications', NotificationsController::class)->only(["store", "index"]);

    Route::apiResource("reports.notes", ReportNotesController::class)->only("store", "destroy", "update");

    Route::apiResource('tags', TagsController::class)->only(["index", "store"]);
    Route::delete("/tags/delete", [TagsController::class, 'destory']);
    Route::apiResource('skills', SkillsController::class)->only(["index"]);
    Route::delete("/skills/delete", [SkillsController::class, 'destory']);

    Route::apiResource('transactions', TransactionsController::class)->only(['index', 'show']);

    Route::apiResource("communities/categories", CommunityCategoriesController::class);
    Route::apiResource("communities", CommunityController::class);

    Route::post("communities/add-translation", [CommunityController::class, "addTranslation"]);
    Route::delete("communities/delete-translation", [CommunityController::class, "deleteTranslation"]);
});



Route::middleware([DataAccessMiddleware::class])->group(function () {
    require(base_path("routes/extrenal_access_api.php"));
});
