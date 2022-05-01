<?php

/**
 * Private Files
 */

use App\Http\Controllers\DownloadsController;
use Illuminate\Support\Facades\Route;

Route::get("/voices/{file}", [DownloadsController::class, "voices"]);
Route::get("/private-documents/{file}", [DownloadsController::class, "privateDocuments"]);
Route::get("/private-media/{file}", [DownloadsController::class, "privateMedia"]);
/**
 * Private Files End
 */
