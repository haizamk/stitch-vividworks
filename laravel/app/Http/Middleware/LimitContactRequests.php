<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;

class LimitContactRequests
{
    public const MAX_ATTEMPTS = 8;

    public const WINDOW_MS = 60 * 60 * 1000;

    /**
     * Eight contact attempts per IP during a rolling hour.
     * A rejected attempt does not add another timestamp.
     *
     * @param  Closure(Request): Response  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $now = (int) floor(microtime(true) * 1000);
        $key = 'contact-submissions:'.($request->ip() ?: 'unknown');
        $recent = array_values(array_filter(
            Cache::get($key, []),
            fn (int|float|string $time): bool => $now - (int) $time < self::WINDOW_MS,
        ));

        if (count($recent) >= self::MAX_ATTEMPTS) {
            Cache::put($key, $recent, self::WINDOW_MS / 1000);

            return response()->json([
                'saved' => false,
                'message' => 'Terlalu banyak percubaan. Cuba lagi kemudian.',
            ], 429);
        }

        $recent[] = $now;
        Cache::put($key, $recent, self::WINDOW_MS / 1000);

        return $next($request);
    }
}
