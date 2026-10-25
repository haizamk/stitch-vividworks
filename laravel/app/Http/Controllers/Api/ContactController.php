<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use App\Support\ContactRules;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Throwable;

class ContactController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $payload = $request->all();
        $contact = ContactRules::normalize(is_array($payload) ? $payload : []);
        $errors = ContactRules::validate($contact);

        if ($errors !== []) {
            return response()->json([
                'saved' => false,
                'errors' => $errors,
            ], 400);
        }

        try {
            $inquiry = Inquiry::query()->create([
                'id' => (string) Str::uuid(),
                ...$contact,
            ]);
            $storage = ContactRules::storageName();

            return response()->json([
                'saved' => true,
                'id' => $inquiry->id,
                'storage' => $storage,
                'message' => ContactRules::savedMessage($storage),
            ], 201);
        } catch (Throwable $exception) {
            Log::error('contact_save_failed', [
                'exception' => $exception::class,
            ]);

            return response()->json([
                'saved' => false,
                'message' => 'Mesej tidak disimpan.',
            ], 500);
        }
    }
}
