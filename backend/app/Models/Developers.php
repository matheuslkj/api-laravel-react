<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Developers extends Model
{
    use HasFactory;
    protected $fillable = [
        'levels_id',
        'nome',
        'sexo',
        'data_nascimento',
        'idade',
        'hobby'
    ];

    protected $appends = [
        'nivel'
    ];

    protected $hidden = [
        'levels_id',
        'levels'
    ];

    public function levels()
    {
        return $this->belongsTo(Level::class);
    }

    public function getNivelAttribute()
    {
        return $this->levels;
    }
}
