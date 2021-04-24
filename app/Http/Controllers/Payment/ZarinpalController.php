<?php

namespace App\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Http\Requests\IRTipPostRequest;
use App\Models\Post;
use App\Models\Tip;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Shetabit\Multipay\Exceptions\InvalidPaymentException;
use Shetabit\Multipay\Invoice;
use Shetabit\Payment\Facade\Payment;

class ZarinpalController extends Controller
{
    public function tipPost(IRTipPostRequest $request)
    {
        $post = Post::find($request->post_id);
        $anonymous = $request->anonymous;
        $invoice = new Invoice();
        $amount = (int) $request->amount;
        $invoice->amount($amount);

        return Payment::config(['callbackUrl' => url('/zarinpal/callback'), 'merchantId' => '"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"', "description" => "حمایت از محتوای " . $post->page->name])
            ->purchase($invoice, function ($driver, $transactionId) use ($amount, $post, $anonymous) {
                $transaction = new Transaction();
                $transaction->user_id = Auth::user()->id;
                $transaction->transaction_id = $transactionId;
                $transaction->amount = $amount;
                $transaction->meta = [
                    'post_id' => $post->id,
                    'anonymous' => (int) $anonymous == 1,
                ];
                $transaction->save();
            })->pay()->toJson();
    }

    public function callback(Request $request)
    {
        $transaction_id = $request->Authority;
        $status = $request->Status;
        $transaction = Transaction::query()->where('transaction_id', $transaction_id)->firstOrFail();

        if ($status == "OK") {
            try {
                $receipt = Payment::config(['merchantId' => '"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"'])->amount((int) $transaction->amount)->transactionId($transaction_id)->verify();
                $transaction->success = true;
                $transaction->save();

                $tip = Tip::create([
                    'post_id' => $transaction->meta['post_id'],
                    'amount' => $transaction->amount,
                    'user_id' => $transaction->user_id,
                    "anonymous" => $transaction->meta['anonymous'],
                    'meta' => [],
                ]);

                // You can show payment referenceId to the user.
                return response()->json(['result' => true, 'tip' => $tip, 'receipt' => $receipt]);
            } catch (InvalidPaymentException $exception) {
                return response()->json(['result' => false, 'message' => $exception->getMessage()]);

            }
        } else {
            $transaction->status = false;
            $transaction->save();
            return response()->json(['result' => false, 'message' => "تراکنش ناموفق"]);
        }
    }
}
