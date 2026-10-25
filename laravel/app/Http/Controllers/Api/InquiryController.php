<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Throwable;

class InquiryController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $expected = (string) config('services.admin.token', '');

        if ($expected === '') {
            return response()->json([
                'message' => 'Tidak dijumpai.',
            ], 404);
        }

        $header = $request->headers->get('Authorization');
        $header = is_string($header) ? $header : '';
        $token = str_starts_with($header, 'Bearer ') ? substr($header, 7) : '';

        if (! hash_equals($expected, $token)) {
            return response()->json([
                'message' => 'Tidak dibenarkan.',
            ], 401);
        }

        try {
            $inquiries = Inquiry::query()
                ->orderByDesc('created_at')
                ->limit(100)
                ->get()
                ->map(fn (Inquiry $inquiry): array => [
                    'id' => $inquiry->id,
                    'name' => $inquiry->name,
                    'email' => $inquiry->email,
                    'business' => $inquiry->business,
                    'plan' => $inquiry->plan,
                    'message' => $inquiry->message,
                    'createdAt' => $inquiry->created_at?->utc()->format('Y-m-d\TH:i:s.v\Z'),
                ])
                ->all();

            return response()->json([
                'inquiries' => $inquiries,
            ]);
        } catch (Throwable $exception) {
            Log::error('inquiry_list_failed', [
                'exception' => $exception::class,
            ]);

            return response()->json([
                'message' => 'Senarai mesej tidak dapat dibaca.',
            ], 500);
        }
    }
}
