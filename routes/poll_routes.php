<?php

use App\Http\Controllers\Poll\PollController;
use Illuminate\Support\Facades\Route;

Route::resource("polls", PollController::class)->only(["show", "destroy"]);
Route::post("/polls/{pollId}/{optionId}/vote", [PollController::class, "vote"]);
Route::get("/polls/{pollId}/options", [PollController::class, "options"]);
