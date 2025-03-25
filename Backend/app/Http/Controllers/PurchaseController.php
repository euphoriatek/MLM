<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Purchase;
use App\Models\Payments;
use App\Models\User;
use App\Models\WalletStatement;
use App\Models\DeliveryAddress;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
class PurchaseController extends Controller
{

    public function store(Request $request)
    {
        $user = auth()->user();
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'User is not authenticated.',
            ], 401);
        }
        if($user->kyc_status != "verified" || !$user->pan_verified){
            return response()->json([
                'status' => false,
                'message' => 'Please complete your KYC before proceeding.',
            ], 200);
        }
        $data = $request->all();
        $userId = $user->id;
        $validator = Validator::make($request->all(), [
            'product_id' => 'required|integer|exists:products,id',
            'size' => 'required|string',
            'price' => 'required|numeric',
            'name' => 'required|string',
            'delivery_address' => 'required|array',
            'r_payment_id' => 'required|string',
            'method' => 'required|string',
            'currency' => 'required|string',
            'user_email' => 'required|email',
            'amount' => 'required|numeric',
            'json_response' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        try {
            $purchase = Purchase::create([
                'user_id' => $userId,
                'product_id' => $request->product_id,
                'size' => $request->size,
                'price' => $request->price,
                'name' => $data['delivery_address']['name'],
                'email' => $data['delivery_address']['email'],
                'phone_number' => $data['delivery_address']['phone_number'],
                'address' => $data['delivery_address']['address'],
                'pin_code' => $data['delivery_address']['pin_code'],
                'alternate_phone_no' => $data['delivery_address']['alternate_phone_no'],
            ]);

            Payments::create([
                'purchase_id' => $purchase->id,
                'user_id' => $userId,
                'r_payment_id' => $request->r_payment_id,
                'method' => $request->method,
                'currency' => $request->currency,
                'user_email' => $request->user_email,
                'amount' => $request->amount,
                'json_response' => json_encode(json_decode($request->json_response, true)),
            ]);
            $this->execution($userId, productId: $request->product_id);
            $user->update(['is_active' => true]);
            return response()->json([
                'status' => true,
                'message' => 'Purchase and payment details saved successfully!',
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'An error occurred while processing your request.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function execution($userId, $productId)
    {
        $product = \DB::table('products')->where('id', $productId)->first();
        $productPrice = $product->price;
        $user = \DB::table('users')->where('id', $userId)->first();
        $currentSponsorId = $user->parent_sponsor_id;
        $commissionLevels = \DB::table('mlm_levels')->where('deleted_at', null)->orderBy('level_no', 'asc')->get();
        $remainingAmount = $productPrice;

        foreach ($commissionLevels as $level) {
            if (!$currentSponsorId) {
                break;
            }

            
            $sponsor = \DB::table('users')->where('sponsor_id', $currentSponsorId)->first();
            if (!$sponsor) {
                break;
            }

            $checkAdmin = \DB::table('users')->where('sponsor_id', $currentSponsorId)->where('role', 'admin')->first();
            if ($checkAdmin) {
                break;
            }
            
            $commission = $level->commission_by_level;
            \DB::table('users')->where('id', $sponsor->id)->increment('wallet_balance', $commission);
            \DB::table('commissions')->insert([
                'user_id' => $sponsor->id,
                'amount' => $commission,
                'package_price'=> $productPrice,
                'description' => "Level {$level->level_no} commission",
                'level' => $level->level_no,
                'credit_by' => $user->id
            ]);
            WalletStatement::create([
                'user_id' => $sponsor->id,
                'amount' => $commission,
                'balance' => $sponsor->wallet_balance,
                'credit_by'=> $user->id,
                'remark' => "Level Income",
                'type' => 'credit',
                'particulars' => "Level Income Credited"
            ]);
            $remainingAmount -= $commission;
            $currentSponsorId = $sponsor->parent_sponsor_id;
        }

        if ($remainingAmount > 0) {
            $admin = \DB::table('users')->where('role', 'admin')->first();
            \DB::table('users')->where('id', $admin->id)->increment('wallet_balance', $remainingAmount);
            \DB::table('commissions')->insert([
                'user_id' => $admin->id,
                'amount' => $remainingAmount,
                'description' => "Remaining commission credited to admin",
                'credit_by' => $user->id,
                'package_price'=> $productPrice
            ]);
            WalletStatement::create([
                'user_id' => $admin->id,
                'amount' => $remainingAmount,
                'balance' => $admin->wallet_balance,
                'credit_by'=> $user->id,
                'remark' => "Level Income",
                'type' => 'credit',
                'particulars' => "Level Income Credited"
            ]);
        }

        \DB::table('transactions')->insert([
            'user_id' => $userId,
            'product_id' => $productId,
            'quantity' => 1,
            'total_price' => $productPrice,
            'commission_amount' => $productPrice - $remainingAmount
        ]);

        // return response()->json(['message' => 'Commission distributed successfully.']);
    }


    public function CreateDeliveryAddress(Request $request)
    {

        $userId = auth()->id();
        $user = User::find($userId);

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'User not found'
            ], 404);
        }
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|email',
            'phone_number' => 'required|string|size:10',
            'alternate_phone_no' => 'nullable|string|size:10',
            'address' => 'required|string',
            'pin_code' => 'required|numeric'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 400);
        }

        try {
            $purchase = DeliveryAddress::create([
                'name' => $request->name,
                'user_id' => $userId,
                'email' => $request->email,
                'phone_number' => $request->phone_number,
                'alternate_phone_no' => $request->alternate_phone_no,
                'address' => $request->address,
                'pin_code' => $request->pin_code
            ]);

            return response()->json([
                'status' => true,
                'message' => 'Delivery Address saved successfully!',
                'data' => $purchase,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'An error occurred while adding the Delivery Address!',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    public function checkActivation(Request $request)
    {
        $user = auth()->user();
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'User is not authenticated.',
            ], 401);
        }
        $userId = $user->id;
        // Check if the user has already purchased the specific product
        $purchase = Purchase::where('user_id', $userId)->first();

        if ($purchase) {
            return response()->json([
                'status' => false,
                'message' => 'You have already purchased this product.',
                'data' => $purchase
            ]);
        } else {
            return response()->json([
                'status' => true,
                'message' => 'Product not purchased yet.',
            ]);
        }
    }

     public function getOrders(Request $request){
        try {
            $withdrawals = Purchase::get();
            return response()->json([
                'status' => true,
                'data' => $withdrawals,
                'message' => 'Success'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while fetching orders.',
                'error' => $e->getMessage(),
            ], 500);
        }
     }
}
