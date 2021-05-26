<?php

namespace App\Http\Controllers\Admin\Tips\Transactions;

use App\Http\Controllers\Controller;
use App\Models\Transaction;

class TransactionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $transactions = Transaction::query()->paginate(10);
        return response()->json(['result' => true, 'transactions' => $transactions]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function show(Transaction $transaction)
    {
        $transaction->load("user");
        return response()->json(['result' => true, 'transaction' => $transaction]);
    }

}
