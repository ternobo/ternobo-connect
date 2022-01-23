<?php

use Illuminate\Support\Facades\Route;

Route::prefix("/settings")->group(function () {
    Route::get("/", "Auth\UsersController@settingsPage");
    Route::post("/verification", "Auth\VerificationController@sendVcode");
    Route::post("/verify", "Auth\VerificationController@verifyCode");

    /** Username Start */
    Route::post('/suggest-username', "Auth\SettingsController@suggest");
    Route::post('/set-username', "Auth\SettingsController@set");
    Route::post('/check-username', "Auth\SettingsController@check");
    /** Username End */

    /** Settings */
    Route::post("/get-info", "Auth\SettingsController@getUserInfo");
    Route::post("/verify-phone", "Auth\SettingsController@verifyNewPhone");
    Route::post("/verify-email", "Auth\SettingsController@verifyNewEmail");
    /** Settings End */

    /**
     * Blocked Pages
     */
    Route::get("/blocked-pages", "BlockController@blockPages");

    Route::post("/set-autodeactivation", "Auth\SettingsController@setAutodeactivationAccount");
});
