<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;

Route::post('register', [AuthController::class, 'register']);
Route::post('login',    [AuthController::class, 'login']);
Route::apiResource('products', ProductController::class);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::apiResource('users', UserController::class);
});
