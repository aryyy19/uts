<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('registrations', function (Blueprint $table) {
            $table->id();

            // Relasi ke tabel program studi
            $table->foreignId('study_program_id')
                  ->constrained()
                  ->cascadeOnDelete();

            // Data calon mahasiswa
            $table->string('full_name');
            $table->string('email')->unique();
            $table->string('phone', 20);
            $table->date('birth_date');
            $table->text('address');
            $table->string('school_origin');

            // Lokasi penyimpanan dokumen pendaftaran
            $table->string('document_path')->nullable();

            // Status pendaftaran
            $table->enum('status', ['pending', 'accepted', 'rejected'])
                  ->default('pending');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('registrations');
    }
};