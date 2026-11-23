<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Memeriksa apakah pengguna memiliki role yang sesuai.
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        // Memeriksa apakah pengguna sudah login
        if (!$request->user()) {
            return response()->json([
                'message' => 'Unauthenticated'
            ], 401);
        }

        // Memeriksa apakah role pengguna sesuai
        if (!$request->user()->hasRole($role)) {
            return response()->json([
                'message' => 'Forbidden'
            ], 403);
        }

        // Melanjutkan request jika pemeriksaan berhasil
        return $next($request);
    }
}
