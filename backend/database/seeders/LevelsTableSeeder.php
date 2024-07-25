<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Level;

class LevelsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        $levels = [
            ['nivel' => 'Junior'],
            ['nivel' => 'Mid-Level'],
            ['nivel' => 'Senior'],
            ['nivel' => 'Tech Lead'],
            ['nivel' => 'Manager'],
        ];

        
        foreach ($levels as $level) {
            Level::create($level);
        }
    }
}
