<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\StudyProgram;

class StudyProgramController extends Controller
{
    // Menampilkan seluruh program studi untuk pilihan formulir
    public function index()
    {
        $programs = StudyProgram::orderBy('name')->get();

        return response()->json([
            'message' => 'Data program studi berhasil ditampilkan.',
            'data' => $programs
        ]);
    }
}