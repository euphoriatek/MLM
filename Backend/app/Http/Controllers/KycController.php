<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\KycDetails;
use App\Models\PanDetails;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
class KycController extends Controller
{
    public function store(Request $request)
    {
        $userId = auth()->id();
        $user = User::find($userId);

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'User not found'
            ], 404);
        }
        // Check if the record already exists
        $existingPan = KycDetails::where('user_id', $userId)
            ->where('account_no', $request->account_no)
            ->first();
            if ($existingPan) {
                return response()->json([
                    'status' => true,
                    'message' => 'This Kyc record already exists for this user.',
                    'data' => $existingPan,
                ], 200);
            }
    
        $validator = Validator::make($request->all(), [
            'account_holder_name' => 'required|string|max:255',
            'ifsc_code' => 'required|string',
            'account_no' => 'required|string|min:10|max:20',
            'bank_name' => 'required|string|max:255',
            'branch_name' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 400);
        }

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $imagePath = $image->storeAs('public/kyc_images', $imageName);
        }

        $input = $request->all();
        try {

            $response = Http::withHeaders([
                'x-api-version' => '2.0',
                'Authorization' => 'eyJhbGciOiJIUzUxMiJ9.eyJhdWQiOiJBUEkiLCJyZWZyZXNoX3Rva2VuIjoiZXlKaGJHY2lPaUpJVXpVeE1pSjkuZXlKaGRXUWlPaUpCVUVraUxDSnpkV0lpT2lKbGRYQm9iM0pwWVhSbGF6SXdNVEJBWjIxaGFXd3VZMjl0SWl3aVlYQnBYMnRsZVNJNkltdGxlVjlzYVhabFh6TlFTMWxTVlRsUFRsZHBiM0l4ZVVwUU9FRTBSWE4wUXpWSk9IUnNWSGR3SWl3aWFYTnpJam9pWVhCcExuTmhibVJpYjNndVkyOHVhVzRpTENKbGVIQWlPakUzTnpBMk9UazROemdzSW1sdWRHVnVkQ0k2SWxKRlJsSkZVMGhmVkU5TFJVNGlMQ0pwWVhRaU9qRTNNemt4TmpNNE56aDkuTVpyTzE4Zk5JdTM2ZVFjeUpkTzB0OGJfZzNkZzZ4MUI1dXktWXd1TUVHbUJlaHR0Y203NmNpV1lFeUZDcXl0Yjl6eDIyenVIN3dCSXQwZHY3dVd0cmciLCJzdWIiOiJldXBob3JpYXRlazIwMTBAZ21haWwuY29tIiwiYXBpX2tleSI6ImtleV9saXZlXzNQS1lSVTlPTldpb3IxeUpQOEE0RXN0QzVJOHRsVHdwIiwiaXNzIjoiYXBpLnNhbmRib3guY28uaW4iLCJleHAiOjE3MzkyNTAyNzgsImludGVudCI6IkFDQ0VTU19UT0tFTiIsImlhdCI6MTczOTE2Mzg3OH0.gdaG_m0242pe2wWZxaQhEjJ3q2M9G7h4A6kGMBVvui7taRv9ZmIEj9s4zNop7LsbUSjJ25UMDQf_65UucMztnA',
                'x-api-key' => env('Sandbox_API_Key'),
            ])
                ->get('https://api.sandbox.co.in/bank/' . $input['ifsc_code']);

            $data = $response->json();
        
            if (!$response->successful()) {

                return response()->json([
                    'status' => false,
                    'message' => 'Not Found',
                    'data' => $data
                ], 404);
            }

            $response = Http::withHeaders([
                'accept' => 'application/json',
                'Authorization' => 'eyJhbGciOiJIUzUxMiJ9.eyJhdWQiOiJBUEkiLCJyZWZyZXNoX3Rva2VuIjoiZXlKaGJHY2lPaUpJVXpVeE1pSjkuZXlKaGRXUWlPaUpCVUVraUxDSnpkV0lpT2lKbGRYQm9iM0pwWVhSbGF6SXdNVEJBWjIxaGFXd3VZMjl0SWl3aVlYQnBYMnRsZVNJNkltdGxlVjlzYVhabFh6TlFTMWxTVlRsUFRsZHBiM0l4ZVVwUU9FRTBSWE4wUXpWSk9IUnNWSGR3SWl3aWFYTnpJam9pWVhCcExuTmhibVJpYjNndVkyOHVhVzRpTENKbGVIQWlPakUzTnpBMk9UazROemdzSW1sdWRHVnVkQ0k2SWxKRlJsSkZVMGhmVkU5TFJVNGlMQ0pwWVhRaU9qRTNNemt4TmpNNE56aDkuTVpyTzE4Zk5JdTM2ZVFjeUpkTzB0OGJfZzNkZzZ4MUI1dXktWXd1TUVHbUJlaHR0Y203NmNpV1lFeUZDcXl0Yjl6eDIyenVIN3dCSXQwZHY3dVd0cmciLCJzdWIiOiJldXBob3JpYXRlazIwMTBAZ21haWwuY29tIiwiYXBpX2tleSI6ImtleV9saXZlXzNQS1lSVTlPTldpb3IxeUpQOEE0RXN0QzVJOHRsVHdwIiwiaXNzIjoiYXBpLnNhbmRib3guY28uaW4iLCJleHAiOjE3MzkyNTAyNzgsImludGVudCI6IkFDQ0VTU19UT0tFTiIsImlhdCI6MTczOTE2Mzg3OH0.gdaG_m0242pe2wWZxaQhEjJ3q2M9G7h4A6kGMBVvui7taRv9ZmIEj9s4zNop7LsbUSjJ25UMDQf_65UucMztnA',
                'x-api-version' => '1.0',
                'x-api-key' => env('Sandbox_API_Key'),
            ])
                ->get('https://api.sandbox.co.in/bank/' . $input['ifsc_code'] . '/accounts/' . $input['account_no'] . '/penniless-verify');

            $data = $response->json();
            if ($response->successful()) {
                if ($data['code'] === 200) {
                    // if ($input['account_holder_name'] != $data['data']['name_at_bank']) {
                    //     return response()->json([
                    //         'status' => false,
                    //         'message' => 'Account Holder Name is not match.'
                    //     ], 201);
                    // }
                    if (isset($data['data']['name_at_bank']) && $input['account_holder_name'] != $data['data']['name_at_bank']) {
                        return response()->json([
                            'status' => false,
                            'message' => 'Account Holder Name does not match.'
                        ], 201);
                    }                    
                } else {
                    return response()->json([
                        'status' => false,
                        'message' => 'Source Unavailable'
                    ], 503);
                }
            } else {
                return response()->json([
                    'status' => false,
                    'message' => $data['message']
                ], 503);
            }
            $kycDetails = KycDetails::create([
                'user_id' => $userId,
                'account_holder_name' => $request->account_holder_name,
                'ifsc_code' => $request->ifsc_code,
                'account_no' => $request->account_no,
                'bank_name' => $request->bank_name,
                'branch_name' => $request->branch_name,
                'image' => $imagePath,
            ]);
            User::where('id', $userId)->update(['kyc_status' => 'verified']);
            return response()->json([
                'message' => 'KYC details stored successfully.',
                'data' => $kycDetails,
                'status' => true,
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'An error occurred while storing the KYC details.',
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function bankifscCodeValidate(Request $request)
    {
        $ifsc_code = $request->input('ifsc');

        if (!$ifsc_code) {
            return response()->json([
                'status' => false,
                'message' => 'IFSC Code is required'
            ], 400);
        }

        $response = Http::withHeaders([
            'x-api-version' => '2.0',
            'Authorization' => 'eyJhbGciOiJIUzUxMiJ9.eyJhdWQiOiJBUEkiLCJyZWZyZXNoX3Rva2VuIjoiZXlKaGJHY2lPaUpJVXpVeE1pSjkuZXlKaGRXUWlPaUpCVUVraUxDSnpkV0lpT2lKbGRYQm9iM0pwWVhSbGF6SXdNVEJBWjIxaGFXd3VZMjl0SWl3aVlYQnBYMnRsZVNJNkltdGxlVjlzYVhabFh6TlFTMWxTVlRsUFRsZHBiM0l4ZVVwUU9FRTBSWE4wUXpWSk9IUnNWSGR3SWl3aWFYTnpJam9pWVhCcExuTmhibVJpYjNndVkyOHVhVzRpTENKbGVIQWlPakUzTnpBMk9UazROemdzSW1sdWRHVnVkQ0k2SWxKRlJsSkZVMGhmVkU5TFJVNGlMQ0pwWVhRaU9qRTNNemt4TmpNNE56aDkuTVpyTzE4Zk5JdTM2ZVFjeUpkTzB0OGJfZzNkZzZ4MUI1dXktWXd1TUVHbUJlaHR0Y203NmNpV1lFeUZDcXl0Yjl6eDIyenVIN3dCSXQwZHY3dVd0cmciLCJzdWIiOiJldXBob3JpYXRlazIwMTBAZ21haWwuY29tIiwiYXBpX2tleSI6ImtleV9saXZlXzNQS1lSVTlPTldpb3IxeUpQOEE0RXN0QzVJOHRsVHdwIiwiaXNzIjoiYXBpLnNhbmRib3guY28uaW4iLCJleHAiOjE3MzkyNTAyNzgsImludGVudCI6IkFDQ0VTU19UT0tFTiIsImlhdCI6MTczOTE2Mzg3OH0.gdaG_m0242pe2wWZxaQhEjJ3q2M9G7h4A6kGMBVvui7taRv9ZmIEj9s4zNop7LsbUSjJ25UMDQf_65UucMztnA',
            'x-api-key' => env('Sandbox_API_Key'),
        ])
            ->get('https://api.sandbox.co.in/bank/' . $ifsc_code);

        $data = $response->json();
        if ($response->successful()) {
            return response()->json([
                'status' => true,
                'message' => 'Success',
                'data' => $data
            ], 200);

        } else {

            return response()->json([
                'status' => false,
                'message' => 'Not Found',
                'data' => $data
            ], 404);
        }
    }
    public function getKyc(){
        try {
        $user = auth()->user();
       $userWallet = $user->wallet_balance;
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'User is not authenticated.',
            ], 401);
        }
        $userId = $user->id;
        $bankKyc = KycDetails::where('user_id', $userId)->first();
        $PanKyc = PanDetails::where('user_id', $userId)->first();
        return response()->json([
            'status' => true,
            'data' => ["bank" => $bankKyc, "pan" => $PanKyc,  'wallet_balance' => $userWallet,],
        ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'error' => $e->getMessage(),
            ], 500);
        }
    }
    
    public function createPanKyc(Request $request)
    {
        // $userId = Auth::id();
        $userId = auth()->id();
        $user = User::find($userId);

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'User not found'
            ], 404);
        }
        $validator = Validator::make($request->all(), [
            'tax_document' => 'required|string|max:255',
            'id_number' => 'required|string',
            'pan_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 400);
        }
        // if ($request->hasFile('pan_image')) {
        //     $image = $request->file('pan_image');
        //     $imageName = time() . '.' . $image->getClientOriginalExtension();
        //     $imagePath = $image->storeAs('public/pan_images', $imageName);
        // }
        $imagePath = null;
        if ($request->hasFile('pan_image')) {
            $image = $request->file('pan_image');
            $imagePath = $image->store('pan_images', 'public');
        }
        $input = $request->all();
        try {
            $response = Http::withHeaders([
                'Authorization' => 'eyJhbGciOiJIUzUxMiJ9.eyJhdWQiOiJBUEkiLCJyZWZyZXNoX3Rva2VuIjoiZXlKaGJHY2lPaUpJVXpVeE1pSjkuZXlKaGRXUWlPaUpCVUVraUxDSnpkV0lpT2lKbGRYQm9iM0pwWVhSbGF6SXdNVEJBWjIxaGFXd3VZMjl0SWl3aVlYQnBYMnRsZVNJNkltdGxlVjlzYVhabFh6TlFTMWxTVlRsUFRsZHBiM0l4ZVVwUU9FRTBSWE4wUXpWSk9IUnNWSGR3SWl3aWFYTnpJam9pWVhCcExuTmhibVJpYjNndVkyOHVhVzRpTENKbGVIQWlPakUzTnpBMk9UazROemdzSW1sdWRHVnVkQ0k2SWxKRlJsSkZVMGhmVkU5TFJVNGlMQ0pwWVhRaU9qRTNNemt4TmpNNE56aDkuTVpyTzE4Zk5JdTM2ZVFjeUpkTzB0OGJfZzNkZzZ4MUI1dXktWXd1TUVHbUJlaHR0Y203NmNpV1lFeUZDcXl0Yjl6eDIyenVIN3dCSXQwZHY3dVd0cmciLCJzdWIiOiJldXBob3JpYXRlazIwMTBAZ21haWwuY29tIiwiYXBpX2tleSI6ImtleV9saXZlXzNQS1lSVTlPTldpb3IxeUpQOEE0RXN0QzVJOHRsVHdwIiwiaXNzIjoiYXBpLnNhbmRib3guY28uaW4iLCJleHAiOjE3MzkyNTAyNzgsImludGVudCI6IkFDQ0VTU19UT0tFTiIsImlhdCI6MTczOTE2Mzg3OH0.gdaG_m0242pe2wWZxaQhEjJ3q2M9G7h4A6kGMBVvui7taRv9ZmIEj9s4zNop7LsbUSjJ25UMDQf_65UucMztnA',
                'x-api-key' => 'key_live_3PKYRU9ONWior1yJP8A4EstC5I8tlTwp',
                'Content-Type' => 'application/json',
            ])->post('https://api.sandbox.co.in/kyc/pan/verify', [
                '@entity' => 'in.co.sandbox.kyc.pan_verification.request',
                'pan' => $input['id_number'],
                'name_as_per_pan' => "KAPIL PATIDAR",
                'date_of_birth' => "29/09/1998",
                'consent' => 'Y',
                'reason' => 'for verification',
            ]);
            $data = $response->json();
            if ($response->successful()) {
                $panDetails = PanDetails::create([
                    'user_id' => $userId,
                    'tax_document' => $input['tax_document'],
                    'id_number' => $input['id_number'],
                    'pan_image' => $imagePath,
                ]);
                User::where('id', $userId)->update(['pan_verified' => 1]);
                return response()->json([
                    'status' => true,
                    'message' => 'PAN verification successful and data saved.',
                    'data' => $panDetails,
                ]);
            } else {
                User::where('id', $userId)->update(['pan_verified' => 1]);
                return response()->json([
                    'status' => false,
                    'message' => 'PAN verification failed',
                    'data' => $data,
                ]);
            }
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'An error occurred while verifying PAN details.',
                'status' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
    public function getExistingBnkKyc(Request $request)
    {
        $userId = Auth::id();

        // Check if the record already exists
        $existingPan = KycDetails::where('user_id', $userId)->first();

        if ($existingPan) {
            return response()->json([
                'status' => true,
                'message' => 'This Kyc record already exists for this user.',
                'data' => $existingPan,
            ], 200);
        }

        return response()->json([
            'status' => false,
            'message' => 'No existing Kyc record found for this user.',
        ], 200);
    }

}