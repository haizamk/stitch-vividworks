<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Support\ContactRules;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Throwable;

class HealthController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $storage = ContactRules::storageName();

        try {
            DB::select('select 1 as ok');

            return response()->json([
                'ok' => true,
                'service' => 'vividworks-my',
                'storage' => $storage,
            ]);
        } catch (Throwable $exception) {
            Log::warning('health_check_failed', [
                'exception' => $exception::class,
            ]);

            return response()->json([
                'ok' => false,
                'service' => 'vividworks-my',
                'storage' => $storage,
            ], 503);
        }
    }
}
