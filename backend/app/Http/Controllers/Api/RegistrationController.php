<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Registration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class RegistrationController extends Controller
{
    // Menampilkan data pendaftaran, pencarian, dan pagination
    public function index(Request $request)
    {
        $query = Registration::with('studyProgram');

        // Mencari berdasarkan nama atau email
        if ($request->filled('search')) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->where('full_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Mengatur jumlah data per halaman
        $perPage = $request->input('per_page', 5);
        $perPage = min(max((int) $perPage, 1), 100);

        $registrations = $query->latest()->paginate($perPage);

        return response()->json($registrations);
    }

    // Menyimpan pendaftaran baru
    public function store(Request $request)
    {
        $validated = $request->validate([
            'study_program_id' => 'required|exists:study_programs,id',
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|unique:registrations,email',
            'phone' => 'required|string|max:20',
            'birth_date' => 'required|date',
            'address' => 'required|string',
            'school_origin' => 'required|string|max:255',
            'document' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
        ]);

        // Upload dokumen jika ada file yang dikirim
        if ($request->hasFile('document')) {
            $validated['document_path'] = $request->file('document')
                ->store('documents', 'public');
        }

        unset($validated['document']);

        // Membuat data pendaftaran
        $registration = Registration::create($validated);

        return response()->json([
            'message' => 'Pendaftaran berhasil ditambahkan.',
            'data' => $registration->load('studyProgram')
        ], 201);
    }

    // Menampilkan detail satu pendaftaran
    public function show(string $id)
    {
        $registration = Registration::with('studyProgram')->findOrFail($id);

        return response()->json([
            'data' => $registration
        ]);
    }

    // Mengubah data pendaftaran
    public function update(Request $request, string $id)
    {
        $registration = Registration::findOrFail($id);

        $validated = $request->validate([
            'study_program_id' => 'required|exists:study_programs,id',
            'full_name' => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                Rule::unique('registrations', 'email')->ignore($registration->id),
            ],
            'phone' => 'required|string|max:20',
            'birth_date' => 'required|date',
            'address' => 'required|string',
            'school_origin' => 'required|string|max:255',
            'document' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
        ]);

        // Mengganti dokumen lama jika ada file baru
        if ($request->hasFile('document')) {
            if ($registration->document_path) {
                Storage::disk('public')->delete($registration->document_path);
            }

            $validated['document_path'] = $request->file('document')
                ->store('documents', 'public');
        }

        unset($validated['document']);

        $registration->update($validated);

        return response()->json([
            'message' => 'Data pendaftaran berhasil diperbarui.',
            'data' => $registration->load('studyProgram')
        ]);
    }

    // Menghapus data pendaftaran
    public function destroy(string $id)
    {
        $registration = Registration::findOrFail($id);

        // Menghapus dokumen yang tersimpan
        if ($registration->document_path) {
            Storage::disk('public')->delete($registration->document_path);
        }

        $registration->delete();

        return response()->json([
            'message' => 'Data pendaftaran berhasil dihapus.'
        ]);
    }
}