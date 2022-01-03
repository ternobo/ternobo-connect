<?php

use App\Http\Controllers\Content\SearchController;
use Illuminate\Support\Facades\Route;

Route::get("/search", [SearchController::class, "search"]);
