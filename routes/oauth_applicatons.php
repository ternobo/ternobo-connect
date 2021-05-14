<?php

use Illuminate\Support\Facades\Route;

Route::get("/connect/google/login", "Socialite\GoogleController@login");
Route::get("/connect/google/callback", "Socialite\GoogleController@callback");

Route::get("/connect/discord/login", "Socialite\DiscordController@login");
Route::get("/connect/discord/callback", "Socialite\DiscordController@callback");

Route::get("/connect/youtube/login", "Socialite\YoutubeController@login");
Route::get("/connect/youtube/callback", "Socialite\YoutubeController@callback");

Route::get("/connect/instagram/login", "Socialite\InstagramController@login");
Route::get("/connect/instagram/callback", "Socialite\InstagramController@callback");

Route::get("/connect/facebook/login", "Socialite\FacebookController@login");
Route::get("/connect/facebook/callback", "Socialite\FacebookController@callback");

Route::get("/connect/github/login", "Socialite\GithubController@login");
Route::get("/connect/github/callback", "Socialite\GithubController@callback");

Route::get("/connect/dribbble/login", "Socialite\DribbbleController@login");
Route::get("/connect/dribbble/callback", "Socialite\DribbbleController@callback");

Route::get("/connect/twitch/login", "Socialite\TwitchController@login");
Route::get("/connect/twitch/callback", "Socialite\TwitchController@callback");

Route::get("/connect/telegram/login", "Socialite\TelegramController@login");
Route::get("/connect/telegram/callback", "Socialite\TelegramController@callback");

Route::get("/connect/twitter/login", "Socialite\TwitterController@login");
Route::get("/connect/twitter/callback", "Socialite\TwitterController@callback");

Route::get("/connect/yahoo/login", "Socialite\YahooController@login");
Route::get("/connect/yahoo/callback", "Socialite\YahooController@callback");

Route::get("/connect/spotify/login", "Socialite\SpotifyController@login");
Route::get("/connect/spotify/callback", "Socialite\SpotifyController@callback");
