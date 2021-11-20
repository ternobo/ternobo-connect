<?php

use App\Http\Controllers\DataAccess\DataExtractionController;
use Illuminate\Support\Facades\Route;

Route::get('/data-access/posts', [DataExtractionController::class, "getAllPosts"]);
Route::get('/data-access/posts/{tag}', [DataExtractionController::class, "getPostsByTag"]);
Route::get('/data-access/tags', [DataExtractionController::class, "getTags"]);
