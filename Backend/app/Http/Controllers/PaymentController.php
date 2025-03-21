<?php

namespace App\Http\Controllers;

use App\Models\Payments;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function GetPayment()
    {
        try {

            $payments = Payments::get();
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
