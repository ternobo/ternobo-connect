<?php

namespace App\Http\Controllers\Donation;

use App\Http\Controllers\Controller;
use App\Http\Requests\PaymentGatewaysRequest;
use App\Http\Resources\DonationCollection;
use App\Models\Tip;
use App\Models\UserOption;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Ternobo\TernoboWire\TernoboWire;

class DontaionsController extends Controller
{

    public function index()
    {
        return TernoboWire::render("Donation/Index");
    }

    public function getDonations(Request $request)
    {
        $filters = $request->filled("filters") ? $request->filters : [
            'sort' => "DESC",
            "my_tips" => false,
        ];

        $tips = Tip::query()->orderBy("created_at", $filters['sort']);

        if ($filters['my_tips']) {
            $tips = $tips->where("user_id", Auth::user()->id);
        }

        return new DonationCollection($tips->paginate(20));
    }

    public function settings()
    {
        $gateways = UserOption::getOption('payment_gateways', [
            'paypal' => [
                'email' => '',
                'enabled' => false,
            ],
            'zarinpal' => [
                'merchant_id' => '',
                'enabled' => false,
            ],
        ]);
        return response()->json(['result' => true, ['gateways' => $gateways]]);
    }

    public function setPaymentGateways(PaymentGatewaysRequest $request)
    {
        $value = [
            'paypal' => [
                'email' => $request->paypal->email,
                'enabled' => $request->paypal->enabled,
            ],
            'zarinpal' => [
                'merchant_id' => $request->zarinpal->merchant_id,
                'enabled' => $request->zarinpal->enabled,
            ],
        ];
        return response()->json(['result' => true, 'option' => UserOption::setOption("payment_gateways", $value)]);
    }

}
