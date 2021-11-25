<?php

use Illuminate\Support\Facades\Route;

Route::prefix("validation")->group(function () {
    Route::post("/username", "Validators\UserRegisterValidatorController@usernameValidation");
});
