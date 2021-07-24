<?php

use Illuminate\Support\Facades\Route;

Route::get('/zarinpal/pay', "Payment\ZarinpalController@tipPost");
Route::get('/zarinpal/callback', "Payment\ZarinpalController@callback");
