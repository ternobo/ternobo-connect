<?php

namespace App\Services;

class RestfulService
{
    public function generateResponse($status, $data, $message = null)
    {
        return [
            'result' => $status,
            'messages' => $message,
            'data' => $data,
        ];
    }
}
