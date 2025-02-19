<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Purchase;
use App\Models\DeliveryAddress;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
class PurchaseController extends Controller
{
    
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|integer|exists:users,id',  
            'product_id' => 'required|integer|exists:products,id', 
            'size' => 'required|string',  
            'price' => 'required|numeric',
            'name' => 'required|string',  
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 400);
        }
        $userId = Auth::id();
        try {
            $purchase = Purchase::create([
                'user_id' => $userId,
                'product_id' => $request->product_id,
                'size' => $request->size, 
                'price' => $request->price,
                'name' => $request->name,
            ]);
            $this->execution($request); 
            return response()->json([
                'status' => true,
                'message' => 'Product purchased successfully!',
                'data' => $purchase,
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'An error occurred while adding the product!',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function execution(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'product_id' => 'required|exists:products,id',
        ]);
        $userId = Auth::id();
        // $userId = $validated['user_id'];
        $productId = $validated['product_id'];
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
            $commission = $level->commission_by_level;
            \DB::table('users')->where('id', $sponsor->id)->increment('wallet_balance', $commission);
            \DB::table('commissions')->insert([
                'user_id' => $sponsor->id,
                'amount' => $commission,
                'description' => "Level {$level->level_no} commission",
                'created_at' => now(),
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
                'created_at' => now(),
            ]);
        }
        \DB::table('transactions')->insert([
            'user_id' => $userId,
            'product_id' => $productId,
            'quantity' => 1,
            'total_price' => $productPrice,
            'commission_amount' => $productPrice - $remainingAmount,
            'created_at' => now(),
        ]);
        return response()->json(['message' => 'Commission distributed successfully.']);
    }
    
    public function CreateDeliveryAddress(Request $request){
        $userId = Auth::id();
        
        if (!$userId) {
            return response()->json([
                'status' => false,
                'message' => 'User is not authenticated.',
            ], 401);
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
                'phone_number' =>  $request->phone_number,  
                'alternate_phone_no' =>  $request->alternate_phone_no,
                'address' =>  $request->address,  
                'pin_code' =>  $request->pin_code
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
    
    
}
