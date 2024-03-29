<?php

use App\Http\Controllers\Content\CommunityExploreController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Content\CommunityTagController;

Route::get("/community/{name}/top-users", [CommunityTagController::class, "getHashtagTopUsers"]);
Route::get("/community/{name}/related-tags", [CommunityTagController::class, "getRelatedTags"]);

Route::get("/interests", [CommunityTagController::class, "interestsPages"]);
Route::post("/interests/set", [CommunityTagController::class, "setInterests"]);

Route::post("/interests/skip", [CommunityTagController::class, "skipInterestPage"]);

Route::get("/explore", [CommunityExploreController::class, "index"]);
Route::get("/communities", [CommunityExploreController::class, "get"]);
