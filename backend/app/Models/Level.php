<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Level extends Model
{
    use HasFactory;
    protected $fillable = [
        'nivel'
    ];

    public function developers()
    {
        return $this->hasMany(Developers::class, 'levels_id');
    }

}
