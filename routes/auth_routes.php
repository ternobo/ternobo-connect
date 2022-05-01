<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\RedirectIfTernoboUser;
use App\Http\Middleware\InviteLinkMiddleware;
use App\Http\Controllers\Auth\VerificationController;
use App\Http\Controllers\Auth\SettingsController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\ForgotPasswordController;

Route::get("/register", [RegisterController::class, "index"])->middleware(RedirectIfTernoboUser::class);
Route::post("/rest-password", [ForgotPasswordController::class, "resetPassword"]);
Route::post("/updatepassword", [ForgotPasswordController::class, "updatePassword"]);
Route::post("/passowrd-reset-verification", [ForgotPasswordController::class, "checkCode"]);

Route::prefix("/auth")->group(function () {
    Route::post("login", [LoginController::class, "login"]);
    Route::post("verify-tfa", [LoginController::class, "twoFactorVerify"]);


    Route::post("verification", [VerificationController::class, "sendVerificationCode"]);
    Route::post("verifycode", [VerificationController::class, "verifyCode"]);
    Route::post("signup", [RegisterController::class, "createUser"]);

    Route::post("logout", [LoginController::class, "logout"]);

    /**
     * Password
     */
    Route::post("/change-password", [SettingsController::class, "changePassword"]);

    // Deactive
    Route::post("/deactive", [SettingsController::class, "deactiveAccount"]);
});
