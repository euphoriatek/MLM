<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;
use SebastianBergmann\CodeCoverage\Report\Html\Dashboard;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\KycController;
use App\Http\Controllers\PurchaseController;

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
Route::get('/get-state/{id}', [UserController::class, 'getStates']);
Route::get('/get-countries', [UserController::class, 'getCountries']);

Route::post('/validate-sponsor', [UserController::class, 'validateSponsor']);
Route::post('/generate-otp', [UserController::class, 'generateOtp']);
Route::post('/validate-mobile', [UserController::class, 'validateMobile']);
// Route::post('/create-kyc', [KycController::class, 'store']);
// Route::post('/create-kyc-pan', [KycController::class, 'createPanKyc']);
Route::get('/get-product-usr', [UserController::class, 'getProduct']);
// Route::get('/get-tree-usr', [UserController::class, 'getUsersTree']);
// Route::post('/purchase-product', [PurchaseController::class, 'store']);
// Register User end

Route::group(['middleware' => ['auth:sanctum']], function () {
    // Admin API

    // Dashboard  Data
    
    // Product
    Route::post('/admin/add-product', [ProductController::class, 'store'])->middleware('role:admin');
    Route::get('/admin/get-product', [ProductController::class, 'GetProduct'])->middleware('role:admin');
    Route::post('/admin/update-product', [ProductController::class, 'updateProduct'])->middleware('role:admin');
    Route::delete('/admin/delete-product/{id}',  [ProductController::class, 'deleteProduct'])->middleware('role:admin');

    // User API
    Route::get('/auth', [UserController::class, 'getAuthDetails'])->middleware('role:user');
    Route::post('/validate-Ifsc', [KycController::class, 'bankifscCodeValidate'])->middleware('role:user');
    Route::post('/purchase-product', [PurchaseController::class, 'store'])->middleware('role:user');
    Route::post('/create-delievery-address', [PurchaseController::class, 'CreateDeliveryAddress'])->middleware('role:user');
    Route::get('/get-tree-usr', [UserController::class, 'getUsersTree']);
    Route::post('/create-kyc-pan', [KycController::class, 'createPanKyc']);
    Route::get('/pan-kyc', [KycController::class, 'getExistingPanKyc']);
    Route::post('/create-kyc', [KycController::class, 'store']);
    Route::get('/bank-kyc', [KycController::class, 'getExistingBnkKyc']);
});

