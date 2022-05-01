<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BlockController;
use App\Http\Controllers\Auth\VerificationController;
use App\Http\Controllers\Auth\UsersController;
use App\Http\Controllers\Auth\SettingsController;

Route::prefix("/settings")->group(function () {
    Route::get("/", [UsersController::class, "settingsPage"]);
    Route::post("/verification", [VerificationController::class, "sendVcode"]);
    Route::post("/verify", [VerificationController::class, "verifyCode"]);

    /** Username Start */
    Route::post('/suggest-username', [SettingsController::class, "suggest"]);
    Route::post('/set-username', [SettingsController::class, "set"]);
    Route::post('/check-username', [SettingsController::class, "check"]);
    /** Username End */

    /** Settings */
    Route::post("/get-info", [SettingsController::class, "getUserInfo"]);
    Route::post("/verify-phone", [SettingsController::class, "verifyNewPhone"]);
    Route::post("/verify-email", [SettingsController::class, "verifyNewEmail"]);
    /** Settings End */

    /**
     * Blocked Pages
     */
    Route::get("/blocked-pages", [BlockController::class, "blockPages"]);

    Route::post("/set-autodeactivation", [SettingsController::class, "setAutodeactivationAccount"]);
});
