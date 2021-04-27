<?php

namespace App\Exceptions;

use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Support\Str;
use Ternobo\TernoboWire\TernoboWire;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    protected function unauthenticated($request, AuthenticationException $exception)
    {
        if ($request->expectsJson() || Str::contains($request->url(), "/api")) {
            return response()->json(['error' => 'Unauthenticated.'], 401);
        }
        return route('welcome');
    }

    /**
     * Prepare exception for rendering.
     *
     * @param  \Throwable  $e
     * @return \Throwable
     */
    public function render($request, Throwable $e)
    {
        $response = parent::render($request, $e);

        if (!config('app.debug')) {
            if ($request->expectsJson()) {
                return response()->json(['error' => $response->status()], $response->status());
            } else if (in_array($response->status(), [500, 503, 404, 403])) {
                return TernoboWire::render('Error', ['status' => $response->status()]);
            } else if ($response->status() === 419) {
                return back()->with([
                    'message' => 'نشست شما منقضی شده لطفا مجدد تلاش کنید.',
                ]);
            }
        }
        return $response;
    }
}
