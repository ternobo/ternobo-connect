<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\Announcement\AnnouncementController;
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

require "api/v1/api_v1.php";

Route::post("/admin/login", [AdminController::class, "login"]);

Route::middleware(["auth:admin-api"])->prefix("/admin")->name("admin-routes.")->group(function () {
    Route::post("/get-user", [AdminController::class, "getUser"]);
    Route::post("/logout", [AdminController::class, "logout"]);
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

    Route::apiResource("communities/categories", CommunityCategoriesController::class)->names([
        "index" => "admin-categories.index",
        "create" => "admin-categories.create",
        "store" => "admin-categories.store",
        "show" => "admin-categories.show",
        "edit" => "admin-categories.edit",
        "update" => "admin-categories.update",
        "destroy" => "admin-categories.destroy"
    ]);

    Route::post("communities/add-translation", [CommunityController::class, "addTranslation"]);
    Route::delete("communities/delete-translation", [CommunityController::class, "deleteTranslation"]);
    Route::get("communities/get-translations/{tag}", [CommunityController::class, "getTranslations"]);
    Route::apiResource("communities", CommunityController::class);

    Route::post("announcements/send", [AnnouncementController::class, 'sendAnnouncement']);
});



Route::middleware([DataAccessMiddleware::class])->group(function () {
    require(base_path("routes/extrenal_access_api.php"));
});
