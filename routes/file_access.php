<?php

use Illuminate\Support\Facades\Route;

Route::get("/profiles/{image}", "DownloadsController@profile");
Route::get("/medias/{image}", "DownloadsController@media");