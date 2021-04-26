<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Http\Requests\IRTipPostRequest;
use App\Models\Post;
use App\Models\Tip;
use App\Models\Transaction;
use App\Models\UserOption;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Shetabit\Multipay\Exceptions\InvalidPaymentException;
use Shetabit\Multipay\Invoice;
use Shetabit\Payment\Facade\Payment;

class ZarinpalController extends Controller
{
    public function tipPost(IRTipPostRequest $request)
    {

        $gateways = UserOption::getOption("payment_gateways");

        if ($gateways['zarinpal']['enabled']) {

            $merchantId = $gateways['zarinpal']['merchant_id'];

            $post = Post::find($request->post_id);
            $anonymous = $request->anonymous;
            $invoice = new Invoice();
            $amount = (int) $request->amount;
            $invoice->amount($amount);
            try {
                return Payment::config(['callbackUrl' => url('/zarinpal/callback'), 'merchantId' => $merchantId, "description" => "حمایت از محتوای " . $post->page->name])
                    ->purchase($invoice, function ($driver, $transactionId) use ($amount, $post, $anonymous, $merchantId) {
                        $transaction = new Transaction();
                        $transaction->user_id = Auth::user()->id;
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

                $tip = Tip::create([
                    'post_id' => $transaction->meta['post_id'],
                    'amount' => $transaction->amount,
                    'user_id' => $transaction->user_id,
                    "anonymous" => $transaction->meta['anonymous'],
                    'meta' => [
                        'ip' => $request->ip(),
                        'transaction_id' => $transaction_id,
                        "reference_id" => $receipt->getReferenceId(),
                    ],
                ]);

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
