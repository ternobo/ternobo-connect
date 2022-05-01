<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\FullAccessUserMiddleware;
use App\Http\Controllers\Donation\DontaionsController;

Route::get("/monetization", [DontaionsController::class, "index"])->middleware(FullAccessUserMiddleware::class);
Route::post("/monetization", [DontaionsController::class, "getDonations"])->middleware(FullAccessUserMiddleware::class);
Route::post("/monetization/settings", [DontaionsController::class, "settings"])->middleware(FullAccessUserMiddleware::class);
Route::put("/monetization/settings", [DontaionsController::class, "setPaymentGateways"])->middleware(FullAccessUserMiddleware::class);
// Get Donations list in Donate to post modal
Route::post("/posts/{post}/monetization", [DontaionsController::class, "getPostDonations"]);
  //End