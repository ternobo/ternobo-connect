<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\FullAccessUserMiddleware;
use App\Http\Controllers\Socialite\YoutubeController;
use App\Http\Controllers\Socialite\YahooController;
use App\Http\Controllers\Socialite\TwitterController;
use App\Http\Controllers\Socialite\TwitchController;
use App\Http\Controllers\Socialite\TelegramController;
use App\Http\Controllers\Socialite\SpotifyController;
use App\Http\Controllers\Socialite\RedditController;
use App\Http\Controllers\Socialite\InstagramController;
use App\Http\Controllers\Socialite\GoogleController;
use App\Http\Controllers\Socialite\GithubController;
use App\Http\Controllers\Socialite\FacebookController;
use App\Http\Controllers\Socialite\DribbbleController;
use App\Http\Controllers\Socialite\DiscordController;

Route::middleware(FullAccessUserMiddleware::class)->group(function () {
    Route::get("/connect/google/login", [GoogleController::class, "login"]);
    Route::get("/connect/google/callback", [GoogleController::class, "callback"]);

    Route::get("/connect/discord/login", [DiscordController::class, "login"]);
    Route::get("/connect/discord/callback", [DiscordController::class, "callback"]);

    Route::get("/connect/youtube/login", [YoutubeController::class, "login"]);
    Route::get("/connect/youtube/callback", [YoutubeController::class, "callback"]);

    Route::get("/connect/instagram/login", [InstagramController::class, "login"]);
    Route::get("/connect/instagram/callback", [InstagramController::class, "callback"]);

    Route::get("/connect/facebook/login", [FacebookController::class, "login"]);
    Route::get("/connect/facebook/callback", [FacebookController::class, "callback"]);

    Route::get("/connect/facebook/delete", [FacebookController::class, "delete"]);

    Route::get("/connect/github/login", [GithubController::class, "login"]);
    Route::get("/connect/github/callback", [GithubController::class, "callback"]);

    Route::get("/connect/dribbble/login", [DribbbleController::class, "login"]);
    Route::get("/connect/dribbble/callback", [DribbbleController::class, "callback"]);

    Route::get("/connect/twitch/login", [TwitchController::class, "login"]);
    Route::get("/connect/twitch/callback", [TwitchController::class, "callback"]);

    Route::get("/connect/telegram/login", [TelegramController::class, "login"]);
    Route::get("/connect/telegram/callback", [TelegramController::class, "callback"]);

    Route::get("/connect/twitter/login", [TwitterController::class, "login"]);
    Route::get("/connect/twitter/callback", [TwitterController::class, "callback"]);

    Route::get("/connect/yahoo/login", [YahooController::class, "login"]);
    Route::get("/connect/yahoo/callback", [YahooController::class, "callback"]);

    Route::get("/connect/spotify/login", [SpotifyController::class, "login"]);
    Route::get("/connect/spotify/callback", [SpotifyController::class, "callback"]);

    Route::get("/connect/reddit/login", [RedditController::class, "login"]);
    Route::get("/connect/reddit/callback", [RedditController::class, "callback"]);
});
