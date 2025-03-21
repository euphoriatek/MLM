<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Commissions;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class CommissionController extends Controller
{
    public function GetCommission()
    {
        try {
            $commissions = Commissions::with('user:id,full_name') 
                ->get();
            $commissions->map(callback: function ($commission) {
                $commission->user_full_name = $commission->user->full_name;
                return $commission;
            });

            return response()->json([
                'status' => true,
                'data' => $commissions,
                'message' => 'Success'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while fetching commission.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

}
