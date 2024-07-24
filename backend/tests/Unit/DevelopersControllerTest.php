<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Developers;
use App\Models\Level;

class DevelopersControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test the index method.
     *
     * @return void
     */
    public function test_index()
    {
        // Cria alguns desenvolvedores de exemplo
        Developers::factory()->count(3)->create();

        // Faz uma requisição GET para o endpoint index
        $response = $this->getJson('/api/v1/developers');

        // Verifica se o status da resposta é 200 e se há 3 desenvolvedores na resposta
        $response->assertStatus(200)
                 ->assertJsonCount(3);
    }

    /**
     * Test the store method.
     *
     * @return void
     */
    public function test_store()
    {
        // Cria um nível de exemplo para relacionar com o desenvolvedor
        $level = Level::factory()->create();

        // Dados válidos para criar um desenvolvedor
        $data = [
            'levels_id' => $level->id,
            'nome' => 'Matheus',
            'sexo' => 'M',
            'data_nascimento' => '2000-01-01',
            'idade' => 24,
            'hobby' => 'Programar'
        ];

        // Faz uma requisição POST para o endpoint store
        $response = $this->postJson('/api/v1/developers', $data);

        // Verifica se o status da resposta é 201 e se os dados foram armazenados
        $response->assertStatus(201)
                 ->assertJsonFragment(['message' => 'Desenvoldedor Criado']);

        // Verifica se o desenvolvedor foi criado no banco de dados
        $this->assertDatabaseHas('developers', $data);
    }

    /**
     * Test the update method.
     *
     * @return void
     */
    public function test_update()
    {
        // Cria um desenvolvedor de exemplo
        $developer = Developers::factory()->create();
        
        // Cria um nível de exemplo para atualizar o desenvolvedor
        $level = Level::factory()->create();

        // Dados para atualizar o desenvolvedor
        $data = [
            'levels_id' => $level->id,
            'nome' => 'Theo',
            'sexo' => 'M',
            'data_nascimento' => '1995-05-05',
            'idade' => 29,
            'hobby' => 'Desenhar'
        ];

        // Faz uma requisição PUT para o endpoint update
        $response = $this->putJson("/api/v1/developers/{$developer->id}", $data);

        // Verifica se o status da resposta é 200 e se os dados foram atualizados
        $response->assertStatus(200)
                 ->assertJsonFragment(['message' => 'Desenvoldedor atualizado']);

        // Verifica se o desenvolvedor foi atualizado no banco de dados
        $this->assertDatabaseHas('developers', $data);
    }

    /**
     * Test the destroy method.
     *
     * @return void
     */
    public function test_destroy()
    {
        // Cria um desenvolvedor de exemplo
        $developer = Developers::factory()->create();

        // Faz uma requisição DELETE para o endpoint destroy
        $response = $this->deleteJson("/api/v1/developers/{$developer->id}");

        // Verifica se o status da resposta é 204 (No Content)
        $response->assertStatus(204);

        // Verifica se o desenvolvedor foi removido do banco de dados
        $this->assertDatabaseMissing('developers', ['id' => $developer->id]);
    }
}
