<?php

namespace App\Services;

use App\Ternobo;
use Http\Client\HttpClient;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use ParagonIE\ConstantTime\Base64;

abstract class ServiceAccess
{
    // AUTH TYPES
    public static $SIMPLEAUTH = "SIMPLE";
    public static $JWTAUTH = "JWT";


    /**
     * Access Types - only HTTP-REST implemented yet.
     */
    public $AccessTypes = [
        "rest" => 'HTTP_REST',
        "soatp" => "SOAP",
        "tcp" => 'TCP',
        "rsocket" => "Rsocket"
    ];

    protected bool $isAuthrequired;
    protected string $authtype;
    private string $applicationPassword;

    public function __construct()
    {
        $this->isAuthrequired = true;
        $this->authtype = self::$SIMPLEAUTH;
        $this->applicationPassword = env("SERVICE_ACCESS_TOKEN", "123456789");
    }

    /**
     * Return Service Endpoint
     */
    protected function getEndpoint(): string
    {
        return env("SERVICE_ACCESS_ENDPOINT");
    }

    /**
     * Return Service name
     */
    public abstract function getServiceName(): string;

    /**
     * Get ready http client, to access service
     * 
     * @return PendingRequest
     */
    public function createRequest(): PendingRequest
    {
        $headers = [
            "application" => "Ternobo",
        ];
        $userId = null;

        if ($this->isAuthrequired) {
            $headers['user'] = Base64::encode(json_encode(Auth::user()));
            $userId = Ternobo::isUserLogedIn() ? Auth::user()->id : 0;
        }
        return Http::withHeaders(["Authorization" => "Token " . $this->applicationPassword, "userId" => $userId])
            ->retry(2)
            ->baseUrl($this->getEndpoint() . "/" . $this->getServiceName());
    }
}
