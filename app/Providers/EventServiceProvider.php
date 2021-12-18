<?php

namespace App\Providers;

use App\Events\PostShareEvent;
use App\Listeners\PostShareListner;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        PostShareEvent::class => [
            PostShareListner::class
        ],
        \SocialiteProviders\Manager\SocialiteWasCalled::class => [
            'SocialiteProviders\Zoho\ZohoExtendSocialite@handle',
            'SocialiteProviders\Discord\DiscordExtendSocialite@handle',
            'SocialiteProviders\YouTube\YouTubeExtendSocialite@handle',
            'SocialiteProviders\InstagramBasic\InstagramBasicExtendSocialite@handle',
            'SocialiteProviders\Dribbble\DribbbleExtendSocialite@handle',
            'SocialiteProviders\Twitch\TwitchExtendSocialite@handle',
            'SocialiteProviders\Telegram\TelegramExtendSocialite@handle',
            'SocialiteProviders\Twitter\TwitterExtendSocialite@handle',
            'SocialiteProviders\Yahoo\YahooExtendSocialite@handle',
            'SocialiteProviders\Spotify\SpotifyExtendSocialite@handle',
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
