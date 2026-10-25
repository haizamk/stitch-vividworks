<?php

use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\HealthController;
use App\Http\Controllers\Api\InquiryController;
use App\Http\Middleware\LimitContactRequests;
use Illuminate\Support\Facades\Route;

Route::get('/health', HealthController::class);
Route::post('/contact', ContactController::class)->middleware(LimitContactRequests::class);
Route::get('/inquiries', InquiryController::class);
