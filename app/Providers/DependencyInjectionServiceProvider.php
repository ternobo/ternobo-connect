<?php

namespace App\Providers;

use App\Services\MonitizationService;
use App\Services\Poll\PollService;
use Illuminate\Support\ServiceProvider;
use PHPHtmlParser\Dom;
use PHPHtmlParser\Options;

class DependencyInjectionServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(Dom::class, function () {
            $dom = new Dom();
            $dom->setOptions((new Options())
                ->setRemoveSmartyScripts(true)
                ->setPreserveLineBreaks(true)
                ->setWhitespaceTextNode(true)
                ->setRemoveScripts(true)
                ->setRemoveStyles(true)
                ->setRemoveDoubleSpace(true));
            return $dom;
        });

        $this->app->bind(MonitizationService::class, function () {
            return new MonitizationService();
        });
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // TODO
    }
}
