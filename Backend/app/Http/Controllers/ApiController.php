<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Servers;
use App\Models\AssigendServer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
class ApiController extends Controller
{
    /**
     * Register a new user.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    //login 
    public function login(Request $request)
    {
        try {

            $validator = Validator::make($request->all(), [
                'mobile_no' => 'required|string',
                'password' => 'required|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'errors' => $validator->errors(),
                ], 400);
            }

            if (Auth::attempt(['mobile_no' => $request->mobile_no, 'password' => $request->password]) && 
                in_array(Auth::user()->role, ['admin', 'superadmin'])) {
                $user = Auth::user();
                if ($user->role == 'admin' && $user->is_active == 0) {
                    return response()->json([
                        'status' => false,
                        'message' => 'Your admin account is inactive. Please contact support.',
                    ], 200);
                }
                $token = $user->createToken('remember_token')->plainTextToken;
                $user->remember_token = $token;
                $user->save();
                $user->token = $token;
                return response()->json([
                    'status' => true,
                    'message' => 'Logged in Successfully!',
                    'data' => $user,
                ], 200);
            }

            return response()->json([
                'status' => false,
                'message' => 'Invalid mobile number and Password!',
            ], 401);

        } catch (\Exception $e) {

            return response()->json([
                'message' => 'An error occurred. Please try again later.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    public function userLogin(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'mobile_no' => 'required|string',
                'password' => 'required|string',
            ]);
            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'errors' => $validator->errors(),
                ], 400);
            }
            if (Auth::attempt(['mobile_no' => $request->mobile_no, 'password' => $request->password, 'role' => 'user'])) {
                $user = Auth::user();
                if ($user->is_active == 0) {
                    return response()->json([
                        'status' => false,
                        'message' => 'Your account is inactive. Please contact support.',
                    ], 200);
                }
                $token = $user->createToken('remember_token')->plainTextToken;
                $user->remember_token = $token;
                $user->save();
                $user->token = $token;
                return response()->json([
                    'status' => true,
                    'message' => 'User Logged in Successfully!',
                    'data' => $user,
                ], 200);
            }
            return response()->json([
                'status' => false,
                'message' => 'Invalid username and Password!',
            ], 401);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred. Please try again later.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}