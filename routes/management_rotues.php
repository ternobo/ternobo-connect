<?php

use App\Http\Controllers\Management\CommunityController;
use Illuminate\Support\Facades\Route;

Route::resource("communities", "Management\CommunityController");
