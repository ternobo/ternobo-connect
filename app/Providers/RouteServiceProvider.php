<?php

namespace App\Providers;

use App\CaseInsensitiveUriValidator;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Routing\Matching\UriValidator;
use Illuminate\Routing\Route as IlluminateRoute;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * The path to the "home" route for your application.
     *
     * This is used by Laravel authentication to redirect users after login.
     *
     * @var string
     */
    public const HOME = '/feed';

    /**
     * The controller namespace for the application.
     *
     * When present, controller route declarations will automatically be prefixed with this namespace.
     *
     * @var string|null
     */
    protected $namespace = 'App\\Http\\Controllers';

    /**
     * Define your route model bindings, pattern filters, etc.
     *
     * @return void
     */
    public function boot()
    {
        $this->configureRateLimiting();

        $validators = IlluminateRoute::getValidators();
        $validators[] = new CaseInsensitiveUriValidator;
        IlluminateRoute::$validators = array_filter($validators, function ($validator) {
            return get_class($validator) != UriValidator::class;
        });

        $this->routes(function () {
            Route::prefix('api')
                ->middleware('api')
                ->namespace($this->namespace)
                ->group(base_path('routes/api.php'));

            Route::middleware('web')
                ->namespace($this->namespace)
                ->group(base_path('routes/web.php'));
        });
    }

    /**
     * Configure the rate limiters for the application.
     *
     * @return void
     */
    protected function configureRateLimiting()
    {
        RateLimiter::for('api', function (Request $request) {
            return Limit::perMinute(60)->by($request->ip());
        });
        RateLimiter::for('web', function (Request $request) {
            return Limit::perMinute(60)->by($request->ip());
        });

        RateLimiter::for("login", function (Request $request) {
            return Limit::perMinute(8)->by($request->ip());
        });

        RateLimiter::for("verficaition", function (Request $request) {
            return Limit::perMinute(2)->by($request->ip())->response(function () {
                return response()->json(['result' => false, "errors" => ["rate-limit" => __("messages.too-many-attempts")]]);
            });
        });

    }
}
