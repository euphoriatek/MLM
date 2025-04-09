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
    // public function getTransaction()
    // {
    //     try {
    //         $transactions = Transactions::with('user:id,full_name', 'product:id,name,price') 
    //             ->get();
    //         $transactions->map(function ($transaction) {
    //             $transaction->user_full_name = $transaction->user->full_name;
    //             $transaction->product_name = $transaction->product->name;
    //             return $transaction;
    //         });

    //         return response()->json([
    //             'status' => true,
    //             'data' => $transactions,
    //             'message' => 'Success'
    //         ], 200);
    //     } catch (\Exception $e) {
    //         return response()->json([
    //             'message' => 'An error occurred while fetching transaction.',
    //             'error' => $e->getMessage(),
    //         ], 500);
    //     }
    // }
    public function getTransaction()
    {
        try {
            $transactions = Transactions::with('user:id,full_name', 'product:id,name,price')
                ->get();

            $transactions->map(function ($transaction) {
                // Check if user is not null before accessing the full_name property
                $transaction->user_full_name = $transaction->user ? $transaction->user->full_name : 'N/A';
                $transaction->product_name = $transaction->product ? $transaction->product->name : 'Unknown';

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

    public function getMembersList()
    {
        try {
            $user = auth()->user();
            if (!$user) {
                return response()->json([
                    'status' => false,
                    'message' => 'User is not authenticated.',
                ], 401);
            }
            $members = User::with('city')->where('role', 'user')->get();
            return response()->json([
                'status' => true,
                'data' => $members,
                'message' => 'Success'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while fetching members.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
