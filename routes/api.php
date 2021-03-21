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

Route::middleware(AdminAPIMiddleware::class)->prefix("/admin")->group(function () {
    Route::resource("/users", "Admin\UsersController");

});
