<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\KycDetails;
use App\Models\PanDetails;
use App\Models\User;
use App\Models\Setting;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Database\QueryException;
class KycController extends Controller
{
    public function store(Request $request)
    {
        $user = auth()->user();
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'User is not Authenticated.',
            ], 401);
        }

        $validator = Validator::make($request->all(), [
            'account_holder_name' => 'required|string|max:255',
            'ifsc_code' => 'required|string',
            'account_no' => 'required|string|min:10|max:20',
            'bank_name' => 'required|string|max:255',
            'branch_name' => 'required|string|max:255',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 400);
        }
        $userId = $user->id;
        // Check if the record already exists
        $existingPan = KycDetails::where('user_id', $userId)
            ->where('account_no', $request->account_no)
            ->first();
        if ($existingPan) {
            return response()->json([
                'status' => true,
                'message' => 'This Kyc Record Already Exists for this User.',
                'data' => $existingPan,
            ], 200);
        }
        $input = $request->all();
        try {
            $kycDetails = KycDetails::create([
                'user_id' => $userId,
                'account_holder_name' => $input['account_holder_name'],
                'ifsc_code' =>  $input['ifsc_code'],
                'account_no' => $input['account_no'],
                'bank_name' => $input['branch_name'],
                'branch_name' => $input['bank_name']
            ]);
            User::where('id', $userId)->update(['kyc_status' => 'verified']);
            return response()->json([
                'message' => 'KYC Details Stored Successfully.',
                'data' => $kycDetails,
                'status' => true,
            ], 201);
        } catch (QueryException $e) {
            if ($e->errorInfo[1] == 1062) {
                return response()->json([
                    'error' => 'Duplicate Entry',
                    'status' => false,
                    'message' => 'The Account Holder Name or Account Number Already Exists.',
                ], 400);
            }
            return response()->json([
                'error' => 'An error occurred while storing the KYC Details.',
                'status' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }
    public function bankifscCodeValidate(Request $request)
    {
        $ifsc_code = $request->input('ifsc');
        if (!$ifsc_code) {
            return response()->json([
                'status' => false,
                'message' => 'IFSC Code is Required'
            ], 400);
        }
        $settings = Setting::whereIn('key', ['SANDBOX_API_KEY', 'SANDBOX_AUTH_TOKEN'])->get()->pluck('value', 'key');
        $response = Http::withHeaders([
            'x-api-version' => '2.0',
            'Authorization' => $settings['SANDBOX_AUTH_TOKEN'],
            'x-api-key' => $settings['SANDBOX_API_KEY'],
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
                'message' => 'Invalid IFSC Code',
                'data' => $data
            ], 404);
        }
    }
    public function getKyc()
    {
        try {
            $user = auth()->user();
            $userWallet = $user->wallet_balance;
            if (!$user) {
                return response()->json([
                    'status' => false,
                    'message' => 'User is not Authenticated.',
                ], 401);
            }
            $userId = $user->id;
            $bankKyc = KycDetails::where('user_id', $userId)->first();
            $PanKyc = PanDetails::where('user_id', $userId)->first();
            return response()->json([
                'status' => true,
                'data' => ["bank" => $bankKyc, "pan" => $PanKyc, 'wallet_balance' => $userWallet],
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
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 400);
        }
        $input = $request->all();
        try {
            $settings = Setting::whereIn('key', ['SANDBOX_API_KEY', 'SANDBOX_AUTH_TOKEN'])->get()->pluck('value', 'key');
            $response = Http::withHeaders([
                'Authorization' => $settings['SANDBOX_AUTH_TOKEN'],
                'x-api-key' => $settings['SANDBOX_API_KEY'],
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

                ]);
                User::where('id', $userId)->update(['pan_verified' => 1]);
                return response()->json([
                    'status' => true,
                    'message' => 'PAN Verification Successful and Data Saved.',
                    'data' => $panDetails,
                ]);
            } else {
                // User::where('id', $userId)->update(['pan_verified' => 1]);
                return response()->json([
                    'status' => false,
                    'message' => 'PAN Verification Failed',
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
                'message' => 'This Kyc Record Already Exists for This User.',
                'data' => $existingPan,
            ], 200);
        }
        return response()->json([
            'status' => false,
            'message' => 'No existing Kyc Record Found for this User.',
        ], 200);
    }

    public function validateIfscAndAccount(Request $request)
    {
        $user = auth()->user();
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'User is not Authenticated.',
            ], 401);
        }
        
        $ifsc_code = $request->input('ifsc_code');
        $account_number = $request->input('account_number');

        if (!$ifsc_code || !$account_number) {
            return response()->json([
                'status' => false,
                'message' => 'IFSC Code and Account Number are required'
            ], 400);
        }

        $settings = Setting::whereIn('key', ['SANDBOX_API_KEY', 'SANDBOX_AUTH_TOKEN'])->get()->pluck('value', 'key');

        // Validate IFSC
        $ifscResponse = Http::withHeaders([
            'x-api-version' => '2.0',
            'Authorization' => $settings['SANDBOX_AUTH_TOKEN'],
            'x-api-key' => $settings['SANDBOX_API_KEY'],
        ])->get('https://api.sandbox.co.in/bank/' . $ifsc_code);

        if (!$ifscResponse->successful()) {
            return response()->json([
                'status' => false,
                'message' => 'Invalid IFSC Code',
                'data' => $ifscResponse->json()
            ], 404);
        }
        $ifscResponse = $ifscResponse->json();
        // Validate Account
        $accountResponse = Http::withHeaders([
            'accept' => 'application/json',
            'Authorization' => $settings['SANDBOX_AUTH_TOKEN'],
            'x-api-version' => '1.0',
            'x-api-key' => $settings['SANDBOX_API_KEY'],
        ])->get("https://api.sandbox.co.in/bank/{$ifsc_code}/accounts/{$account_number}/penniless-verify");

        $accountData = $accountResponse->json();

        if (!$accountResponse->successful() || $accountData['code'] !== 200 || !$accountData['data']['account_exists']) {
            return response()->json([
                'status' => false,
                'message' => 'Invalid Account Number',
                'data' => $accountData
            ], 503);
        }
        $response = [
            "branch" => $ifscResponse['BRANCH'],
            "bank" => $ifscResponse['BANK'],
            "ifsc_code" => $ifscResponse['IFSC'],
            "account_no" => $account_number,
            "account_holder_name" => $accountData['data']['name_at_bank'],
        ];
        return response()->json([
            'status' => true,
            'data' => $response
        ], 200);
    }
}