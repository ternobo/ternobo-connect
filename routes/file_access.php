<?php

use App\Http\Controllers\DownloadsController;
use Illuminate\Support\Facades\Route;

Route::get("/profiles/{image}", [DownloadsController::class, "profile"]);
Route::get("/media/{image}", [DownloadsController::class, "media"]);
Route::get("/videos/{image}", [DownloadsController::class, "video"]);
