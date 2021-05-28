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
        $filters = $request->filled("filter") ? $request->filter : [
            'sort' => "DESC",
            "my_tips" => "all",
        ];

        $tips = Tip::query()->whereHas("user")->orderBy("created_at", $filters['sort']);

        $page_id = Auth::user()->personalPage->id;
        if ($filters['my_tips'] == "all") {
            $tips = $tips->whereRaw("post_id in (select id from posts where page_id = ?)", [$page_id]);
            $tips = $tips->orWhere("user_id", Auth::user()->id);
        } elseif ($filters['my_tips'] == "my") {
            $tips = $tips->where("user_id", Auth::user()->id);
        } else {
            $tips = $tips->whereRaw("post_id in (select id from posts where page_id = ?)", [$page_id]);
            $tips = $tips->where("user_id", "!=", Auth::user()->id);
        }
        return new DonationCollection($tips->paginate(20));
    }

    public function getPostDonations($post_id, Request $request)
    {
        $tips = Tip::query()->whereHas("user")->where("post_id", $post_id)->paginate(20);
        return new DonationCollection($tips);
    }

    public function canEnableDonate()
    {
        $gateways = UserOption::getOption("payment_gateways", [
            'paypal' => [
                'email' => '',
                'enabled' => false,
            ],
            'zarinpal' => [
                'merchant_id' => '',
                'enabled' => false,
            ],
        ]);

        return response()->json(['result' => $gateways['zarinpal']['enabled']]);
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
        return response()->json(['result' => true, 'gateways' => $gateways]);
    }

    public function setPaymentGateways(PaymentGatewaysRequest $request)
    {
        $value = [
            'zarinpal' => [
                'merchant_id' => $request->zarinpal["merchant_id"],
                'enabled' => $request->zarinpal["enabled"],
            ],
        ];
        return response()->json(['result' => true, 'option' => UserOption::setOption("payment_gateways", $value)]);
    }

}
