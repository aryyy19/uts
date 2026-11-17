<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class StudyProgram extends Model
{
    // Kolom yang boleh diisi
    protected $fillable = [
        'name',
        'description',
    ];

    // Satu program studi memiliki banyak pendaftar
    public function registrations(): HasMany
    {
        return $this->hasMany(Registration::class);
    }
}