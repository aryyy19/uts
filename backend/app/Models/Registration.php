<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Registration extends Model
{
    // Kolom yang boleh diisi
    protected $fillable = [
        'study_program_id',
        'full_name',
        'email',
        'phone',
        'birth_date',
        'address',
        'school_origin',
        'document_path',
        'status',
    ];

    // Setiap pendaftaran dimiliki satu program studi
    public function studyProgram(): BelongsTo
    {
        return $this->belongsTo(StudyProgram::class);
    }
}