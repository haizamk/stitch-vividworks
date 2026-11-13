<?php

use App\Http\Middleware\RejectOversizedJson;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: null,
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->throttleApi(null);
        // Coolify is the only path to this container. Do not publish port 80 on the host.
        $middleware->trustProxies(at: '*');
        $middleware->prependToGroup('api', RejectOversizedJson::class);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) => $request->is('api/*') || $request->expectsJson(),
        );

        $exceptions->render(function (NotFoundHttpException|MethodNotAllowedHttpException $exception, Request $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'message' => 'Tidak dijumpai.',
                ], 404);
            }
        });
    })->create();
