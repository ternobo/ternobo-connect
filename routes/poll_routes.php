<?php

use Illuminate\Support\Facades\Route;

Route::resource("polls", "Poll\PollController")->only(["show", "destroy"]);
Route::post("/polls/{pollId}/{optionId}/vote", "Poll\PollController@vote");
Route::get("/polls/{pollId}/options", "Poll\PollController@options");
