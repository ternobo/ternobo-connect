<?php

use App\Http\Controllers\Donation\MonitizationController;
use Illuminate\Support\Facades\Route;

Route::get('/zarinpal/pay', "Payment\ZarinpalController@tipPost");
Route::get('/zarinpal/callback', "Payment\ZarinpalController@callback");

Route::get("/monitization/status", [MonitizationController::class, "getMonitizationStatus"]);
Route::post("/monitization/request", [MonitizationController::class, "sendMonitizationRequest"]);
