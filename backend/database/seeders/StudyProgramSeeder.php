<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\StudyProgram;

class StudyProgramSeeder extends Seeder
{
    public function run(): void
    {
        // Data program studi awal
        $programs = [
            [
                'name' => 'S1 Pendidikan Teknik Informatika',
                'description' => 'Program studi bidang pendidikan dan teknologi informatika.',
            ],
            [
                'name' => 'S1 Sistem Informasi',
                'description' => 'Program studi bidang sistem informasi dan bisnis digital.',
            ],
            [
                'name' => 'S1 Ilmu Komputer',
                'description' => 'Program studi bidang komputasi.',
            ],
            [
                'name' => 'D4 Teknologi Rekayasa Perangkat Lunak',
                'description' => 'Program studi bidang pengembangan perangkat lunak.',
            ],
        ];

        // Masukkan data tanpa membuat duplikat nama
        foreach ($programs as $program) {
            StudyProgram::firstOrCreate(
                ['name' => $program['name']],
                ['description' => $program['description']]
            );
        }
    }
}