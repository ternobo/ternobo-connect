<?php

use Illuminate\Support\Facades\Route;

Route::get("/profiles/{image}", "DownloadsController@profile");
Route::get("/media/{image}", "DownloadsController@media");
Route::get("/videos/{image}", "DownloadsController@video");
