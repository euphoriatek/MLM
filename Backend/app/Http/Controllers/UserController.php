<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Country;
use App\Models\State;
use App\Models\Otp;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\PersonalAccessToken;
use Carbon\Carbon;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Http;
class UserController extends Controller
{

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'parent_sponsor_id' => 'required|string|max:255',
            'full_name' => 'required|string|max:255',
            // 'country_id' => 'required|string|max:255',
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

            if (!$Parent_sponsor->is_active) {
                return response()->json([
                    'status' => false,
                    'message' => 'User is not activated. Please use another sponsor ID.'
                ], 200);
            }
            // $sponsor_id = mt_rand(1000000000, 9999999999);
            $sponsor_id = $request->input('mobile_no');
            $user = User::create([
                'sponsor_id' => $sponsor_id,
                'parent_sponsor_id' => $request->input('parent_sponsor_id'),
                'full_name' => $request->input('full_name'),
                // 'country_id' => $request->input('country_id'),
                'state_id' => $request->input('state_id'),
                'mobile_no' => $request->input('mobile_no'),
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password')),
                'pin_code' => $request->input('pin_code'),
                'address' => $request->input('address'),
                'title' => "Mr."
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
    public function getStates(Request $request)
    {
        try {
            // $country_id = $id;
            // if ($country_id) {
            //     $states = State::where('country_id', $country_id)->get();
            // } else {
                // $states = State::all();
            // }
            $states = State::get();
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
                'message' => "Sponser Id does't Match!"
            ], 200);
        }

        if (!$User->is_active) {
            return response()->json([
                'status' => false,
                'message' => 'User is not activated. Please use another sponsor ID.'
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

        $apiKey = 'owpFdOkPuUm1pOX1npCVqg';
        $senderId = 'SKLIFE';
        $number = $mobile_number;
        $otp = mt_rand(100000, 999999);
        $message = "Dear customer, the one-time password (OTP) to reset your password at SKLIFE is {$otp}. This OTP will expire in 1 minute.";

        $url = "https://www.smsgatewayhub.com/api/mt/SendSMS?APIKey={$apiKey}&senderid={$senderId}&channel=OTP&DCS=0&flashsms=0&number={$number}&text=" . urlencode($message) . "&route=1&EntityId=1701174140886417267&dlttemplateid=1707174221782943778";

        // Send GET request
        $response = Http::get($url);
        $data = $response->json();
        $otp_expiry = Carbon::now()->addMinutes(1);
        if ($data['ErrorCode'] == 000) {
            Otp::create([
                'mobile_number' => $mobile_number,
                'otp' => $otp,
                'otp_expiry' => $otp_expiry,
                'is_verified' => false,
            ]);
            return response()->json([
                'message' => 'OTP sent successfully',
                'status' => true
            ], 200);
        } else {
            return response()->json([
                'message' => 'Try Again',
                'status' => false
            ], 401);
        }
    }

    public function verifyOtp(Request $request)
    {
        $otp = $request->input('otp');

        if (!$otp) {
            return response()->json([
                'status' => false,
                'message' => 'OTP is required'
            ], 400);
        }

        $otpRecord = Otp::where('otp', $otp)->first();

        if (!$otpRecord) {
            return response()->json([
                'status' => false,
                'message' => 'Invalid OTP'
            ], 400);
        }

        if (Carbon::now()->lt($otpRecord->otp_expiry)) {
            $otpRecord->is_verified = true;
            $otpRecord->otp = null;
            $otpRecord->otp_expiry = null;
            $otpRecord->save();

            return response()->json([
                'status' => true,
                'message' => 'OTP verified successfully'
            ], 200);
        }

        return response()->json([
            'status' => false,
            'message' => 'OTP has expired. Please resend.'
        ], status: 200);
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

    public function getUsersTree(Request $request)
    {

        $user = auth()->user();
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'User is not authenticated.',
            ], 401);
        }
        $input = $request->all();
        $userId = $input['user_id'];
        $loggedInUser = User::find($userId);
        $rootSponsorId = $loggedInUser->sponsor_id;
        $users = User::where('parent_sponsor_id', $rootSponsorId)->get();
        $usersWithCount = $users->map(function ($user) {
            $user->Downlinecount = User::where('parent_sponsor_id', $user->sponsor_id)->count();
            return $user;
        });
        return response()->json([
            'status' => true,
            'data' => $usersWithCount,
        ], 200);
    }

    // public function getUsersTreeSearch(Request $request)
    // {

    //     $user = auth()->user();
    //     if (!$user) {
    //         return response()->json([
    //             'status' => false,
    //             'message' => 'User is not authenticated.',
    //         ], 401);
    //     }
    //     $input = $request->all();
    //     $User = User::where('mobile_no', $input['data'])->first();
    //     if(!$User){
    //         return response()->json([
    //             'status' => false,
    //             'message' => 'No Matched',
    //         ], 400);
    //     }
    //     $rootSponsorId = $User->sponsor_id;
    //     $users = User::where('parent_sponsor_id', $rootSponsorId)->get();
    //     $usersWithCount = $users->map(function ($user) {
    //         $user->Downlinecount = User::where('parent_sponsor_id', $user->sponsor_id)->count();
    //         return $user;
    //     });

    //     return response()->json([
    //         'status' => true,
    //         'data' => $usersWithCount,
    //         'user' => $User
    //     ], 200);
    // }
    // public function getUsersTreeSearch(Request $request)
    // {
    //     $user = auth()->user();
    //     if (!$user) {
    //         return response()->json([
    //             'status' => false,
    //             'message' => 'User is not authenticated.',
    //         ], 401);
    //     }

    //     $input = $request->all();
    //     $User = User::where('mobile_no', trim($input['data']))->first();

    //     if (!$User) {
    //         return response()->json([
    //             'status' => false,
    //             'message' => 'No Matched',
    //         ], 400);
    //     }

    //     $rootSponsorId = $User->sponsor_id;

    //     // ✅ Exclude the searched user from the downline results
    //     $users = User::where('parent_sponsor_id', $rootSponsorId)
    //         ->where('id', '!=', $User->id) 
    //         ->get();

    //     $usersWithCount = $users->map(function ($user) {
    //         $user->Downlinecount = User::where('parent_sponsor_id', $user->sponsor_id)->count();
    //         return $user;
    //     });

    //     return response()->json([
    //         'status' => true,
    //         'data' => $usersWithCount,
    //         'user' => $User // Only send the searched user separately
    //     ], 200);
    // }

    public function getUsersTreeSearch(Request $request)
    {
        $user = auth()->user();
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'User is not authenticated.',
            ], 401);
        }
    
        $input = $request->all();
        $User = User::where('mobile_no', trim($input['data']))->first();
    
        if (!$User) {
            return response()->json([
                'status' => false,
                'message' => 'No Matched',
            ], 400);
        }
    
        $rootSponsorId = $User->sponsor_id;
    
        // Fetch users where parent_sponsor_id matches the rootSponsorId and exclude the current user.
        $users = User::where('parent_sponsor_id', $rootSponsorId)
            ->where('id', '!=', $User->id)
            ->distinct() 
            ->get();
        $usersWithCount = $users->map(function ($user) {
            $user->Downlinecount = User::where('parent_sponsor_id', $user->sponsor_id)->count();
            return $user;
        });
    
        return response()->json([
            'status' => true,
            'data' => $usersWithCount,
            'user' => $User
        ], 200);
    }
    
    public function getUser(Request $request)
    {
        $userId = auth()->id();
        $User = User::find($userId);
        return response()->json([
            'status' => true,
            'data' => $User,
            'message' => 'Success'
        ], 200);

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
    public function updateProfile(Request $request)
    {
        $userId = auth()->id();
        $user = User::find($userId);

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'User not found'
            ], 404);
        }

        if ($request->hasFile('image')) {
            $image = $request->file('image');

            $request->validate([
                'image' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            $imagePath = $image->store('profile_pictures', 'public');

            if ($user->image) {
                Storage::disk('public')->delete($user->image);
            }

            $user->image = $imagePath;
        }

        $user->update($request->except('image'));

        return response()->json([
            'status' => true,
            'message' => 'User profile updated successfully',
            'data' => $user
        ]);
    }
    public function verifyOldPassword(Request $request)
    {
        $userId = auth()->id();
        $user = User::find($userId);

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'User not found'
            ], 404);
        }

        // Validate request
        $validator = Validator::make($request->all(), [
            'password' => 'required|string',
            'new_password' => 'required|string|min:6|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/',
            'confirm_password' => 'required|same:new_password',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => $validator->errors()->first(),
            ], 422);
        }

        // Verify old password
        if (!Hash::check($request->input('password'), $user->password)) {
            return response()->json([
                'status' => false,
                'message' => 'Old password is incorrect.',
            ], 400);
        }

        // Update password
        $user->password = Hash::make($request->input('new_password'));
        $user->save();

        return response()->json([
            'status' => true,
            'message' => 'Password updated successfully.'
        ], 200);
    }
    public function loginHistory(Request $request)
    {
        $user = auth()->user();

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'User not found'
            ], 404);
        }

        $query = PersonalAccessToken::where('tokenable_id', $user->id);

        if ($request->has(['from_date', 'to_date'])) {
            $fromDate = Carbon::parse($request->from_date)->startOfDay();
            $toDate = Carbon::parse($request->to_date)->endOfDay();
            $query->whereBetween('created_at', [$fromDate, $toDate]);
        }

        $loginRecords = $query->get()

            ->map(function ($record, $index) use ($user) {
                return [
                    's_no' => $index + 1,
                    'email' => $user->email,
                    'date' => $record->created_at->format('Y-m-d H:i:s'),
                    'mobile_no' => $user->mobile_no ?? 'N/A',
                    'login_status' => $record->last_used_at ? 'Success' : 'Failed',
                ];
            });

        return response()->json([
            'status' => true,
            'data' => $loginRecords,
        ], 200);
    }

    public function getUserDetails(Request $request)
    {

        $user = User::select('full_name', 'email', 'sponsor_id', 'created_at', 'mobile_no', 'address')->where('mobile_no', $request->input('user'))->first();

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'User not found'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'data' => $user
        ], status: 200);
    }

    public function getReferralUsers(Request $request)
    {
        $user = auth()->user();
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'User is not authenticated.',
            ], 401);
        }
        $Referral = User::with(['purchases:user_id,price,created_at', 'states:id,name'])->where('parent_sponsor_id', $user->sponsor_id)->get();
        return response()->json([
            'status' => true,
            'data' => $Referral
        ], status: 200);
    }
    public function getDownlineUsers(Request $request)
    {
        $user = auth()->user();
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'User is not authenticated.',
            ], 401);
        }
        $sponsor_id = $user->sponsor_id;
        $chain = [];
        $this->getDownlineChain($sponsor_id, $chain);
        return response()->json([
            'status' => true,
            'data' => $chain
        ], status: 200);
    }

    private function getDownlineChain($sponsor_id, &$chain)
    {
        $users = User::with(['purchases', 'states:id,name'])
            ->where('parent_sponsor_id', $sponsor_id)
            ->get();

        foreach ($users as $user) {
            $chain[] = $user;
            $this->getDownlineChain($user->id, $chain);
        }
    }

    public function updateVBlock(Request $request)
    {
        try {
            $input = $request->input('user_id');
            if ($input) {
                $user = User::find($input);

                if (!$user) {
                    return response()->json([
                        'status' => false,
                        'message' => 'User not found.',
                    ], 404);
                }
                $user->update(['is_block' => $user->is_block == 1 ? 0 : 1]);

                return response()->json([
                    'status' => true,
                    'message' => 'User status updated successfully.',
                    'is_block' => $user->is_block
                ], 200);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'User id is required.',
                ], 404);
            }
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'An error occurred while updating data.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

}
