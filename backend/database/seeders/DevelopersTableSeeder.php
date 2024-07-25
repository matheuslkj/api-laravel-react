<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Developers;
use Carbon\Carbon;

class DevelopersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
    
        $developers = [
            [
                'levels_id' => 1, 
                'nome' => 'Teste1',
                'sexo' => 'F',
                'data_nascimento' => '1990-01-01',
                'idade' => 34,
                'hobby' => 'Coding'
            ],
            [
                'levels_id' => 2,
                'nome' => 'Teste2',
                'sexo' => 'M',
                'data_nascimento' => '1995-05-20',
                'idade' => 29,
                'hobby' => 'Gaming'
            ],
            [
                'levels_id' => 3,
                'nome' => 'Teste3',
                'sexo' => 'F',
                'data_nascimento' => '1985-03-15',
                'idade' => 39,
                'hobby' => 'Reading'
            ],
            [
                'levels_id' => 4,
                'nome' => 'Teste4',
                'sexo' => 'M',
                'data_nascimento' => '1992-09-10',
                'idade' => 31,
                'hobby' => 'Hiking'
            ],
            [
                'levels_id' => 5,
                'nome' => 'Teste5',
                'sexo' => 'M',
                'data_nascimento' => '1988-07-25',
                'idade' => 36,
                'hobby' => 'Music'
            ],
        ];

    
        foreach ($developers as $developer) {
            Developer::create($developer);
        }
    }
}
