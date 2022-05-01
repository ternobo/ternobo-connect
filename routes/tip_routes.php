<?php

use App\Http\Controllers\Donation\MonetizationController;
use App\Http\Controllers\Payment\ZarinpalController;
use Illuminate\Support\Facades\Route;

Route::get('/zarinpal/pay', [ZarinpalController::class, "tipPost"]);
Route::get('/zarinpal/callback', [ZarinpalController::class, "callback"]);

Route::get("/monitization/status", [MonetizationController::class, "getMonetizationStatus"]);
Route::post("/monitization/request", [MonetizationController::class, "sendMonetizationRequest"]);
