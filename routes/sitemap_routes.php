<?php

use App\Http\Controllers\SiteMapController;
use Illuminate\Support\Facades\Route;

Route::get('/sitemap.xml', [SiteMapController::class, "all"]);
Route::get('/sitemap-posts.xml', [SitemapController::class, "posts"]);
Route::get('/sitemap-profiles.xml', [SiteMapController::class, "profiles"]);
