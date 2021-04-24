<?php

namespace App\Http\Requests;

use Illuminate\Support\Facades\Auth;

class PaymentGatewaysRequest extends BaseRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'paypal.email' => ['email'],

            'paypal.enabled' => ['boolean'],
            'zarinpal.enabled' => ['boolean'],
        ];
    }
}
