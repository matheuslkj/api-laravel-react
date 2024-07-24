<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Level;

class LevelControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test the index method.
     *
     * @return void
     */
    public function test_index()
    {
        // Cria alguns níveis de exemplo
        Level::factory()->count(3)->create();

        // Faz uma requisição GET para o endpoint index
        $response = $this->getJson('/api/v1/levels');

        // Verifica se o status da resposta é 200 e se há 3 níveis na resposta
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
        // Dados válidos para criar um nível
        $data = [
            'nivel' => 'Nível 1',
        ];

        // Faz uma requisição POST para o endpoint store
        $response = $this->postJson('/api/v1/levels', $data);

        // Verifica se o status da resposta é 200 e se os dados foram armazenados
        $response->assertStatus(200)
                 ->assertJsonFragment(['message' => 'Nivel Criado']);

        // Verifica se o nível foi criado no banco de dados
        $this->assertDatabaseHas('levels', $data);
    }

    /**
     * Test the update method.
     *
     * @return void
     */
    public function test_update()
    {
        // Cria um nível de exemplo
        $level = Level::factory()->create();

        // Dados para atualizar o nível
        $data = [
            'nivel' => 'Nível Atualizado',
        ];

        // Faz uma requisição PUT para o endpoint update
        $response = $this->putJson("/api/v1/levels/{$level->id}", $data);

        // Verifica se o status da resposta é 200 e se os dados foram atualizados
        $response->assertStatus(200)
                 ->assertJsonFragment(['message' => 'Nivel atualizado']);

        // Verifica se o nível foi atualizado no banco de dados
        $this->assertDatabaseHas('levels', $data);
    }

    /**
     * Test the destroy method.
     *
     * @return void
     */
    public function test_destroy()
    {
        // Cria um nível de exemplo
        $level = Level::factory()->create();

        // Faz uma requisição DELETE para o endpoint destroy
        $response = $this->deleteJson("/api/v1/levels/{$level->id}");

        // Verifica se o status da resposta é 204 (No Content)
        $response->assertStatus(204);

        // Verifica se o nível foi removido do banco de dados
        $this->assertDatabaseMissing('levels', ['id' => $level->id]);
    }
}
