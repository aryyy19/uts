<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\StudyProgramController;
use App\Http\Controllers\Api\RegistrationController;

// Menampilkan daftar program studi
Route::get('/study-programs', [StudyProgramController::class, 'index']);

// CRUD pendaftaran mahasiswa
Route::apiResource('/registrations', RegistrationController::class);