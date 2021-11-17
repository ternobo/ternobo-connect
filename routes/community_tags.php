<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Content\CommunityTagController;

Route::get("/community/{name}/top-users", [CommunityTagController::class, "getHashtagTopUsers"]);
