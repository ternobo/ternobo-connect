<?php

use App\Http\Controllers\Validators\UserRegisterValidatorController;
use Illuminate\Support\Facades\Route;

Route::prefix("validation")->group(function () {
    Route::post("/username", [UserRegisterValidatorController::class, "usernameValidation"]);
});
