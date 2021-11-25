<?php

use App\Http\Middleware\InviteLinkMiddleware;
use Illuminate\Support\Facades\Route;

Route::get("/register", "Auth\RegisterController@index")->middleware("guest");
Route::post("/rest-password", "Auth\ForgotPasswordController@resetPassword");
Route::post("/updatepassword", "Auth\ForgotPasswordController@updatePassword");
Route::post("/passowrd-reset-verification", "Auth\ForgotPasswordController@checkCode");

Route::prefix("/auth")->group(function () {
    Route::post('login', 'Auth\LoginController@login');
    Route::post('verify-tfa', 'Auth\LoginController@twoFactorVerify');


    Route::post('verification', 'Auth\VerificationController@sendVerificationCode');
    Route::post('verifycode', 'Auth\VerificationController@verifyCode');
    Route::post("signup", "Auth\RegisterController@createUser");

    Route::post('logout', 'Auth\LoginController@logout');

    /**
     * Password
     */
    Route::post("/change-password", "Auth\SettingsController@changePassword");

    // Deactive
    Route::post("/deactive", "Auth\SettingsController@deactiveAccount");
});
