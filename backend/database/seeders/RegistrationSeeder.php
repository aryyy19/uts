<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Registration;
use App\Models\StudyProgram;

class RegistrationSeeder extends Seeder
{
    public function run(): void
    {
        // Memastikan data program studi sudah tersedia
        $programs = StudyProgram::orderBy('id')->get();

        if ($programs->isEmpty()) {
            $this->command->error('Data program studi belum tersedia.');

            return;
        }

        // Data calon mahasiswa beserta pilihan program studi
        $registrations = [
            [
                'study_program_id' => 3,
                'full_name' => 'Ary Wiguna',
                'email' => 'ary@example.com',
                'phone' => '081234567890',
                'birth_date' => '2006-03-19',
                'address' => 'Singaraja, Bali',
                'school_origin' => 'SMA Negeri 1 Rendang',
            ],
            [
                'study_program_id' => 2,
                'full_name' => 'Budi Santoso',
                'email' => 'budi@example.com',
                'phone' => '081234567891',
                'birth_date' => '2005-03-15',
                'address' => 'Denpasar, Bali',
                'school_origin' => 'SMA Negeri 1 Denpasar',
            ],
        ];

        // Menambahkan atau memperbarui data pendaftaran
        foreach ($registrations as $data) {
            Registration::updateOrCreate(
                ['email' => $data['email']],
                $data
            );
        }
    }
}