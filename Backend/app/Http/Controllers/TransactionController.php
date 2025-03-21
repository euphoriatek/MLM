<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transactions;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class TransactionController extends Controller
{
    public function GetTransaction()
    {
        try {
            $transactions = Transactions::with('user:id,full_name', 'product:id,name,price') 
                ->get();
            $transactions->map(function ($transaction) {
                $transaction->user_full_name = $transaction->user->full_name;
                $transaction->product_name = $transaction->product->name;
                return $transaction;
            });

            return response()->json([
                'status' => true,
                'data' => $transactions,
                'message' => 'Success'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while fetching transaction.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    

}
