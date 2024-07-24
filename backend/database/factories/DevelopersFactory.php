<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\developers>
 */
class DevelopersFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'levels_id' => \App\Models\Level::factory(), 
            'nome' => $this->faker->name,
            'sexo' => $this->faker->randomElement(['M', 'F']),
            'data_nascimento' => $this->faker->dateTimeBetween('-18 years'),
            'idade' => $this->faker->numberBetween(18, 65),
            'hobby' => $this->faker->word,
        ];
    }
}
