<?php

namespace App\Http\Controllers;

use App\Models\Payments;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function getPayment()
    {
        try {
            $user = auth()->user();
            if (!$user) {
                return response()->json([
                    'status' => false,
                    'message' => 'User is not authenticated.',
                ], 401);
            }
            // $payments = Payments::get();
            $payments = Payments::with(['user' => function($query) {
                $query->select('id', 'full_name');
            }])->get();
            return response()->json([
                'status' => true,
                'data' => $payments,
                'message' => 'Success'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while fetching payment.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
