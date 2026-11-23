<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Memproses login pengguna dan membuat token Sanctum.
     */
    public function login(Request $request)
    {
        // Memvalidasi email dan password yang dikirim
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Memeriksa kecocokan email dan password
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Email atau password salah'
            ], 401);
        }

        // Mengambil data pengguna yang berhasil login
        $user = Auth::user();

        // Membuat token untuk autentikasi API
        $token = $user->createToken('auth_token')->plainTextToken;

        // Mengirim data pengguna dan token sebagai respons
        return response()->json([
            'message' => 'Login berhasil',
            'user' => $user,
            'token' => $token,
        ], 200);
    }

    /**
     * Menghapus token yang sedang digunakan untuk logout.
     */
    public function logout(Request $request)
    {
        // Menghapus token Sanctum yang sedang aktif
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout berhasil'
        ], 200);
    }
}
