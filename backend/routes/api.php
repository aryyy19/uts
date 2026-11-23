<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\StudyProgramController;
use App\Http\Controllers\Api\RegistrationController;
use App\Http\Controllers\Api\AuthController;

// Menampilkan daftar program studi
Route::get('/study-programs', [StudyProgramController::class, 'index']);

// Login pengguna
Route::post('/login', [AuthController::class, 'login']);

// Endpoint yang hanya dapat diakses setelah login
Route::middleware('auth:sanctum')->group(function () {

    // Logout pengguna
    Route::post('/logout', [AuthController::class, 'logout']);

    // Menampilkan data pengguna yang sedang login
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Pendaftaran hanya dapat ditambahkan oleh user
    Route::post('/registrations', [RegistrationController::class, 'store'])
        ->middleware('role:user');

    // Pengelolaan data pendaftar hanya dapat dilakukan admin
    Route::middleware('role:admin')->group(function () {

        // Melihat seluruh data pendaftar
        Route::get('/registrations', [RegistrationController::class, 'index']);

        // Melihat detail pendaftar
        Route::get('/registrations/{registration}', [RegistrationController::class, 'show']);

        // Memperbarui data pendaftar
        Route::put('/registrations/{registration}', [RegistrationController::class, 'update']);

        // Memperbarui sebagian data pendaftar
        Route::patch('/registrations/{registration}', [RegistrationController::class, 'update']);

        // Menghapus data pendaftar
        Route::delete('/registrations/{registration}', [RegistrationController::class, 'destroy']);
    });
});
