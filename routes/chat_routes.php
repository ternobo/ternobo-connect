<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Chats\ChatController;

Route::prefix("chats")->group(function () {
    Route::get("/", [ChatController::class, "index"]);
    Route::post("/", [ChatController::class, "getChats"]);
    Route::post("/search", [ChatController::class, "search"]);
    Route::post("/conversations/{id}", [ChatController::class, "chat"]);
    Route::post("/conversations/{id}/mute", [ChatController::class, "muteChat"]);

    Route::post("/conversations/create/{id}", [ChatController::class, "createConversation"]);

    Route::post("/send-message", [ChatController::class, "sendMessage"]);
});
