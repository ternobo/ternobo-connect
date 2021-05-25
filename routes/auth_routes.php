<?php

use App\Http\Middleware\InviteLinkMiddleware;
use Illuminate\Support\Facades\Route;

Route::post("/rest-password", "Auth\ForgotPasswordController@resetPassword");
Route::post("/updatepassword", "Auth\ForgotPasswordController@updatePassword");

Route::prefix("/auth")->group(function () {
    Route::post('login', 'Auth\LoginController@login');
    Route::post('verify-tfa', 'Auth\LoginController@twoFactorVerify');

    Route::middleware(InviteLinkMiddleware::class)->group(function () {
        Route::post('verification', 'Auth\VerificationController@sendVcode');
        Route::post('verifycode', 'Auth\VerificationController@verifyCode');
        Route::post("signup", "Auth\RegisterController@signupUser");
        Route::post("setpassword", "Auth\RegisterController@savePassword");
    });

    Route::post('logout', 'Auth\LoginController@logout');

    /**
     * Password
     */
    Route::post("/change-password", "Auth\SettingsController@changePassword");

    // Deactive
    Route::post("/deactive", "Auth\SettingsController@deactiveAccount");
});
