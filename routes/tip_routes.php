<?php

use App\Http\Controllers\Donation\MonetizationController;
use Illuminate\Support\Facades\Route;

Route::get('/zarinpal/pay', "Payment\ZarinpalController@tipPost");
Route::get('/zarinpal/callback', "Payment\ZarinpalController@callback");

Route::get("/monitization/status", [MonetizationController::class, "getMonetizationStatus"]);
Route::post("/monitization/request", [MonetizationController::class, "sendMonetizationRequest"]);
