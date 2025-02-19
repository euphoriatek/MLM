<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\State;
use App\Models\Country;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'parent_sponsor_id' => 'required|string|max:255',
            'full_name' => 'required|string|max:255',
            'country_id' => 'required|string|max:255',
            'mobile_no' => 'required|string|regex:/^[0-9]{10}$/|max:20|unique:users,mobile_no',
            'state_id' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'password' => 'required|string|min:6',
            'pin_code' => 'required|string|regex:/^[0-9]{5,6}$/|max:6',
            'address' => 'required|string|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 400);
        }

        try {
            $Parent_sponsor = User::where('sponsor_id', $request->input('parent_sponsor_id'))->first();
            if (!$Parent_sponsor) {
                return response()->json([
                    'status' => false,
                    'message' => 'Invalid sponsor ID'
                ], 201);
            }
            $sponsor_id = mt_rand(1000000000, 9999999999);
            $user = User::create([
                'sponsor_id' => $sponsor_id,
                'parent_sponsor_id' => $request->input('parent_sponsor_id'),
                'full_name' => $request->input('full_name'),
                'country_id' => $request->input('country_id'),
                'mobile_no' => $request->input('mobile_no'),
                'state_id' => $request->input('state_id'),
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password')),
                'pin_code' => $request->input('pin_code'),
                'address' => $request->input('address'),
            ]);
            return response()->json([
                'status' => true,
                'message' => 'User registered successfully!',
                'data' => $user,
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Error during user registration: ' . $e->getMessage());

            return response()->json([
                'status' => false,
                'message' => 'An error occurred while registering the user.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function getStates(Request $request, $id)
    {
        try {
            $country_id = $id;
            if ($country_id) {
                $states = State::where('country_id', $country_id)->get();
            } else {
                $states = State::all();
            }

            return response()->json([
                'status' => true,
                'data' => $states,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'An error occurred while fetching the states.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    public function getCountries()
    {
        try {
            $Country = Country::all();
            return response()->json([
                'status' => true,
                'data' => $Country,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'An error occurred while fetching the Countries.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function validateSponsor(Request $request)
    {
        $SponsorID = $request->input('SponsorID');

        if (!$SponsorID) {
            return response()->json([
                'status' => false,
                'message' => 'SponsorID is required'
            ], 400);
        }

        $User = User::where('sponsor_id', $SponsorID)->first();

        if (!$User) {
            return response()->json([
                'status' => false,
                'message' => 'No user found for the provided SponsorID'
            ], 200);
        }

        return response()->json([
            'status' => true,
            'message' => 'Success',
            'data' => $User->full_name . ($User->email ? ' (' . $User->email . ')' : '')
        ], 200);
    }

    public function generateOtp(Request $request)
    {
        $mobile_number = $request->input('mobile_number');

        if (!$mobile_number) {
            return response()->json([
                'status' => false,
                'message' => 'Mobile Number is required'
            ], 400);
        }

        return response()->json([
            'status' => true,
            'message' => 'Success'
        ], 200);
    }
    public function validateMobile(Request $request)
    {
        $mobile_number = $request->input('mobile_number');
        $User = User::where('mobile_no', $mobile_number)->first();
        if ($User) {
            return response()->json([
                'status' => true,
                'message' => 'Already exiest'
            ], 200);
        }

        return response()->json([
            'status' => false,
            'message' => 'Not Matched'
        ], 200);
    }

    public function getAuthDetails()
    {
        $user = auth()->user();
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'User is not authenticated.',
            ], 401);
        }
        return response()->json([
            'status' => true,
            'message' => 'Success',
            'data' => $user
        ], 200);
    }
    public function execution(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'product_id' => 'required|exists:products,id',
        ]);
        $userId = $validated['user_id'];
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
    public function getProduct()
    {
        try {
            $product = Product::get();
            return response()->json([
                'status' => true,
                'data' => $product,
                'message' => 'Success'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while fetching product.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    public function getUsersTree(Request $request)
    {
        $userId = auth()->id();
        $loggedInUser = User::find($userId);
        $rootSponsorId = $loggedInUser->parent_sponsor_id;
        $users = User::all();
        $tree = $this->buildTree($users, $rootSponsorId);

        return response()->json($tree);
    }
    private function buildTree($users, $parentSponsorId)
    {
        $children = [];

        foreach ($users as $user) {
            if ($user->parent_sponsor_id == $parentSponsorId) {
                $node = [
                    'label' => $user->full_name,
                    'data' => $user,
                    'children' => $this->buildTree($users, $user->sponsor_id)
                ];
                $children[] = $node;
            }
        }

        return $children;
    }
    // public function getUsersTree()
    // {
    //     // Get all users
    //     $users = User::all();
    //     // Build the tree starting with the root user (parent_sponsor_id is null)
    //     $tree = $this->buildTree($users, null);
    //     return response()->json($tree);
    // }

}
