<?php

use App\Http\Controllers\BlockController;
use Illuminate\Support\Facades\Route;

Route::post('/block/{page_id}', [BlockController::class, "blockPage"]);
Route::delete('/block/{page_id}', [BlockController::class, "unblockPage"]);
