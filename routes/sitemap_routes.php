<?php

use Illuminate\Support\Facades\Route;

Route::get('/sitemap.xml', 'SiteMapController@all');
Route::get('/sitemap-posts.xml', 'SiteMapController@posts');
Route::get('/sitemap-posts.xml', 'SiteMapController@posts');
Route::get('/sitemap-profiles.xml', 'SiteMapController@profiles');
