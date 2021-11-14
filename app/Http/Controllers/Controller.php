<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function getCsrf()
    {
        return response()->json(['csrf' => csrf_token()]);
    }

    public function generateResponse($status, $data = null, $message = null, $code = 200)
    {
        return response()->json(["status" => $status, "data" => $data, "message" => $message], $code);
    }
}
