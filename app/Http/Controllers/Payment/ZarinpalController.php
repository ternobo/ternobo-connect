<?php

namespace App\Http\Controllers\Payment;

use App\Events\DonateEvent;
use App\Http\Controllers\Controller;
use App\Http\Requests\IRTipPostRequest;
use App\Models\Notification;
use App\Models\Post;
use App\Models\Tip;
use App\Models\Transaction;
use App\Models\User;
use App\Models\UserOption;
use App\Ternobo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Shetabit\Multipay\Exceptions\InvalidPaymentException;
use Shetabit\Multipay\Invoice;
use Shetabit\Payment\Facade\Payment;

class ZarinpalController extends Controller
{
    public function tipPost(IRTipPostRequest $request)
    {
        $post = Post::withRelations()->findOrFail($request->post_id);

        $phone = $request->phone;

        $user = Ternobo::isUserLogedIn() ? Auth::user() : User::query()->where("phone", $phone)->first();

        $gateways = UserOption::getOption("payment_gateways", [
            'paypal' => [
                'email' => '',
                'enabled' => false,
            ],
            'zarinpal' => [
                'merchant_id' => '',
                'enabled' => false,
            ],
        ], $post->page->user_id);

        if ($gateways['zarinpal']['enabled']) {

            $merchantId = $gateways['zarinpal']['merchant_id'];

            $anonymous = $request->anonymous;
            $invoice = new Invoice();
            $amount = (int) $request->amount;
            $invoice->amount($amount);
            try {
                return Payment::config(['callbackUrl' => url('/zarinpal/callback'), 'merchantId' => $merchantId, "description" => "حمایت از محتوای " . $post->page->name])
                    ->purchase($invoice, function ($driver, $transactionId) use ($amount, $post, $anonymous, $merchantId, $phone, $user) {
                        $transaction = new Transaction();
                        if ($user) {
                            $transaction->user_id = $user->id;
                            $transaction->phone_number = $user->phone;
                        } else {
                            $transaction->phone_number = $phone;
                            $transaction->guest = true;
                        }
                        $transaction->transaction_id = $transactionId;
                        $transaction->amount = $amount;
                        $transaction->meta = [
                            'post_id' => $post->id,
                            'anonymous' => (int) $anonymous == 1,
                            'merchant_id' => $merchantId,
                        ];
                        $transaction->save();
                    })->pay()->render();
            } catch (Exception $ex) {
                return view("invalidPayment");
            }
        }
        return view("invalidPayment");
    }

    public function callback(Request $request)
    {
        $transaction_id = $request->Authority;
        $status = $request->Status;
        $transaction = Transaction::query()->where('transaction_id', $transaction_id)->firstOrFail();
        $merchantId = $transaction->meta['merchant_id'];
        if ($status == "OK") {
            try {
                $receipt = Payment::config(['merchantId' => $merchantId])->amount((int) $transaction->amount)->transactionId($transaction_id)->verify();
                $transaction->success = true;
                $transaction->save();

                $post = Post::withRelations()->find($transaction->meta['post_id']);

                $tip = Tip::create([
                    'post_id' => $transaction->meta['post_id'],
                    'amount' => $transaction->amount,
                    'user_id' => $transaction->user_id,
                    'phone_number' => $transaction->phone_number,
                    "anonymous" => $transaction->meta['anonymous'],
                    'meta' => [
                        'ip' => $request->ip(),
                        'transaction_id' => $transaction_id,
                        "reference_id" => $receipt->getReferenceId(),
                    ],
                ]);

                Notification::sendNotification("donation", $transaction->meta['post_id'], $post->page_id, $tip->id, null, Auth::guest());
                event(new DonateEvent($tip));
                // Show Payment Done
                return view("payment-done");
            } catch (InvalidPaymentException $exception) {
                return view("payment-error");
            }
        } else {
            $transaction->success = false;
            $transaction->save();
            return view("payment-error");
        }
    }
}
