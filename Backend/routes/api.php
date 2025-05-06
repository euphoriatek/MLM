<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;
use SebastianBergmann\CodeCoverage\Report\Html\Dashboard;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\KycController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\CommissionController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\BankWithdrawalController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [ApiController::class, 'UserLogin']);

Route::post('/admin/login', [ApiController::class, 'login']);

// Register User
Route::post('/signup', [UserController::class, 'store']);
Route::post('/sync-data', [UserController::class, 'execution']);
Route::get('/get-countries', [UserController::class, 'getCountries']);
Route::get('/get-state', [UserController::class, 'getStates']);
Route::get('/get-cities/{id}', [UserController::class, 'getCities']);
Route::post('/validate-sponsor', [UserController::class, 'validateSponsor']);
Route::post('/generate-otp', [UserController::class, 'generateOtp']);
Route::post('/verify-otp', [UserController::class, 'verifyOtp']);
Route::post('/validate-mobile', [UserController::class, 'validateMobile']);

// Forgot
Route::post('/send-otp', [UserController::class, 'sendOtp']);
Route::post('/update-password', [UserController::class, 'updatePassword']);
// Route::post('/create-kyc', [KycController::class, 'store']);
// Route::post('/create-kyc-pan', [KycController::class, 'createPanKyc']);

// Route::get('/get-tree-usr', [UserController::class, 'getUsersTree']);
// Route::post('/purchase-product', [PurchaseController::class, 'store']);
// Register User end

Route::group(['middleware' => ['auth:sanctum']], function () {
    // Admin API
   
    // Dashboard  Data

    // Product
    Route::post('/admin/add-product', [ProductController::class, 'store'])->middleware('role:admin');
    Route::get('/admin/get-product', [ProductController::class, 'getProduct'])->middleware('role:admin');
    Route::post('/admin/update-product', [ProductController::class, 'updateProduct'])->middleware('role:admin');
    Route::delete('/admin/delete-product/{id}', [ProductController::class, 'deleteProduct'])->middleware('role:admin');

    //Members List
    Route::get('/admin/get-members-list', [TransactionController::class, 'getMembersList'])->middleware('role:admin');
    Route::post('/admin/update-user-status', [UserController::class, 'updateVBlock'])->middleware('auth:admin');
    Route::get('/admin/auth', [UserController::class, 'getAuthDetails'])->middleware('role:admin');
    //Orders List
    Route::get('/admin/get-orders-list', [PurchaseController::class, 'getOrders'])->middleware('role:admin');
    Route::post('/admin/get-tree-usr', [UserController::class, 'getUsersTree'])->middleware('role:admin');
    Route::post('/admin/user-details', [UserController::class, 'getUserDetails'])->middleware('role:admin');
    Route::post('/admin/search-tree-usr', [UserController::class, 'getUsersTreeSearch'])->middleware('role:admin');

    // Commissions
    Route::get('/admin/get-commissions', [CommissionController::class, 'GetCommission'])->middleware('role:admin');
    // Transactions
    Route::get('/admin/get-transactions', [TransactionController::class, 'getTransaction'])->middleware('role:admin');
    // payments
    Route::get('/admin/get-payments', [PaymentController::class, 'getPayment'])->middleware('role:admin');
    Route::get('/admin/get-withdrawals', [BankWithdrawalController::class, 'getWithdrawals'])->middleware('role:admin');
    Route::post('/admin/update-approved-staus', [BankWithdrawalController::class, 'approvedStatus'])->middleware('role:admin');
    Route::post('/admin/update-rejected-staus', [BankWithdrawalController::class, 'rejectStatus'])->middleware('role:admin');
    // Earning Wallet
    // Level Income
    Route::get('/admin/level-income', [CommissionController::class, 'getLevelIncomeAdmin'])->middleware('role:admin');
    Route::get('/admin/wallet-statement', [CommissionController::class, 'walletStatementAdmin'])->middleware('role:admin');
// add city
    Route::post('/admin/add-city', [UserController::class, 'addCity'])->middleware('role:admin');
    // User API
    Route::get('/auth', [UserController::class, 'getAuthDetails'])->middleware('role:user');
    Route::post('/validate-Ifsc', [KycController::class, 'bankifscCodeValidate'])->middleware('role:user');
    Route::post('/validate-ifsc-account', [KycController::class, 'validateIfscAndAccount'])->middleware('role:user');


    Route::post('/create-delievery-address', [PurchaseController::class, 'CreateDeliveryAddress'])->middleware('role:user');
    // My-Account
    Route::get('/get-user', [UserController::class, 'getUser'])->middleware('role:user');
    Route::post('/update-profile', [UserController::class, 'updateProfile'])->middleware('role:user');
    // KYC
    Route::post('/create-kyc-pan', [KycController::class, 'createPanKyc'])->middleware('role:user');
    Route::post('/create-kyc', [KycController::class, 'store'])->middleware('role:user');
    Route::post('/verify-old-password', [UserController::class, 'verifyOldPassword'])->middleware('role:user');
    Route::get('/get-login-history', [UserController::class, 'loginHistory'])->middleware('role:user');
    // Kyc
    Route::get('/user-kyc-info', [KycController::class, 'getKyc'])->middleware('role:user');
    ;
    // Activation
    Route::get('/get-product', [ProductController::class, 'getProduct'])->middleware('role:user');
    Route::get('/check-activation', [PurchaseController::class, 'checkActivation'])->middleware('role:user');
    Route::post('/create-order', [PurchaseController::class, 'createOrder'])->middleware('role:user');
    Route::get('/check-plan-isactive', [PurchaseController::class, 'checkPlanIsActive'])->middleware('role:user');
    Route::get('/service-ability', [PurchaseController::class, 'checkPincodeDelhivery'])->middleware('role:user');
    // Tree view
    Route::post('/get-tree-usr', [UserController::class, 'getUsersTree'])->middleware('role:user');
    Route::post('/search-tree-usr', [UserController::class, 'getUsersTreeSearch'])->middleware('role:user');
    Route::post('/user-details', [UserController::class, 'getUserDetails'])->middleware('role:user');
    // Direct-referral-list
    Route::get('/get-referral', [UserController::class, 'getReferralUsers'])->middleware('role:user');
    Route::get('/get-downline', [UserController::class, 'getDownlineUsers'])->middleware('role:user');

    // Earning Wallet
    // Level Income
    Route::get('/level-income', [CommissionController::class, 'getLevelIncome'])->middleware('role:user');
    Route::get('/wallet-statement', [CommissionController::class, 'walletStatement'])->middleware('role:user');
    Route::get('/withdrawals-history', [BankWithdrawalController::class, 'withdrawalsHistory'])->middleware('role:user');
    // / Bank Withdrawal
    Route::post('/save-withdrawal', [BankWithdrawalController::class, 'SaveWithdrawal'])->middleware('role:user');
    // Order
    Route::get('/get-order', [PurchaseController::class, 'getOrder'])->middleware('role:user');
    Route::post('/get-invoice', [PurchaseController::class, 'getInvoice'])->middleware('role:user');
    // level count
    Route::get('/get-current-level', [UserController::class, 'getCurrentLevel'])->middleware('role:user');

});
Route::post('/transfer-to-bulkpe', [BankWithdrawalController::class, 'transferToBulkpe']);
//Mlm Profit Level
Route::get('/mlm-levels', [UserController::class, 'getMlmLevel']);
Route::post('/razorpay/webhook', [PurchaseController::class, 'handleWebhook']);
Route::get('/razorpayx/payout/{orderId}', [PurchaseController::class, 'fullPayoutFlow']);
