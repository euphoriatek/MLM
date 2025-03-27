<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Withdrawal;
use App\Models\User;
use App\Models\Setting;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class BankWithdrawalController extends Controller
{

    public function SaveWithdrawal(Request $request)
    {
        $user = auth()->user();
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'User is not authenticated.',
            ], 401);
        }

        $validator = Validator::make($request->all(), [
            'price' => 'required|numeric',
            'bank_name' => 'required|string',
            'ifsc_code' => 'required|string',
            'account_holder_name' => 'required|string',
            'branch_name' => 'required|string',
            'account_no' => 'required|numeric'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 400);
        }

        try {
            $user = auth()->user();
            $userId = $user->id;
            $input = $request->all();

            if ($input['price'] > $user->wallet_balance) {
                return response()->json([
                    'status' => false,
                    'message' => 'Insufficient balance in wallet',
                ], 400);
            }
            $settings = Setting::where('key', 'WITHDRAWAL_TDS')->get()->pluck('value', 'key');
            $tdsAmount = round(($input['price'] * $settings['WITHDRAWAL_TDS']) / 100); // Round off the TDS amount
            $netPayableAmount = round($input['price'] - $tdsAmount);
            $tdsPercentage = $settings['WITHDRAWAL_TDS'];
            $user->wallet_balance -= $input['price'];
            $user->essrow_balance += $input['price'];
            $user->save();
            $input['user_id'] = $userId;
            $input['net_payable_amount'] = $netPayableAmount;
            $input['tds_amount'] = $tdsAmount;
            $input['tds_percentage'] = $tdsPercentage;
            $withdrawal = Withdrawal::create($input);

            return response()->json([
                'status' => true,
                'message' => 'Withdrawal successfully processed!',
                'data' => $withdrawal,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'An error occurred while processing the withdrawal!',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    public function getWithdrawals(Request $request)
    {
        try {
            $withdrawals = Withdrawal::get();

            $withdrawals->map(callback: function ($withdrawals) {
                $withdrawals->user_full_name = $withdrawals->user->full_name;
                return $withdrawals;
            });

            return response()->json([
                'status' => true,
                'data' => $withdrawals,
                'message' => 'Success'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while fetching withdrawals.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    public function approvedStatus(Request $request)
    {
        try {
            $id = $request->id;

            $withdrawal = Withdrawal::findOrFail($id);
           
            $withdrawal->update(['status' => 'approved']);
            return response()->json([
                'status' => true,
                'message' => 'Success',
                'withdrawal' => $withdrawal,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while approved status.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function rejectStatus(Request $request)
    {
        try {
        
            $withdrawal = Withdrawal::findOrFail($request->id);
     
         
            $user = $withdrawal->user; 
        
            $user->wallet_balance += $withdrawal->price;
            $withdrawal->update(['status' => 'rejected','price'=>'0.00']);
            $user->save(); 
    
            return response()->json([
                'status' => true,
                'message' => 'Success',
                'withdrawal' => $withdrawal,
                'user' => [
                    'id' => $user->id,
                    'wallet_balance' => $user->wallet_balance 
                ]
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while rejecting status.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function withdrawalsHistory(Request $request)
    {
        try {
            $user = auth()->user();
            if (!$user) {
                return response()->json([
                    'status' => false,
                    'message' => 'User is not authenticated.',
                ], 401);
            }

            $withdrawals = Withdrawal::where('user_id', $user->id)->get();

            return response()->json([
                'status' => true,
                'data' => $withdrawals,
                'message' => 'Success'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while fetching withdrawals.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function transferToBulkpe(Request $request)
    {
        $user = auth()->user();

        $amount = $user->wallet_balance;

        if ($amount <= 0) {
            return response()->json(['message' => 'Insufficient funds'], 400);
        }

        // Example Bulkpe API call (Replace with real API endpoint)
        $bulkpeResponse = Http::post('https://bulkpe.in/api/transfer', [
            'mobile_no' => $user->mobile_no,
            'amount' => $amount,
            'api_key' => env('BULKPE_API_KEY'),
        ]);

        if ($bulkpeResponse->successful()) {
            // Deduct from internal wallet after successful transfer
            $user->wallet_balance = 0;
            $user->save();

            return response()->json(['message' => 'Funds transferred successfully']);
        } else {
            return response()->json(['message' => 'Transfer failed'], 500);
        }
    }

}
