<?php

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
        'users' => "Admin\UsersController",
        'reports' => 'Admin\ReportsController',
    ]);

});
