<?php

namespace App\Http\Controllers\Validators;

use App\Http\Controllers\Controller;
use App\Rules\UsernameValidator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserRegisterValidatorController extends Controller
{
    public function usernameValidation(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'value' => ['required', new UsernameValidator()]
        ]);
        return $this->generateResponse(!$validation->fails(), null, $validation->errors());
    }
}
