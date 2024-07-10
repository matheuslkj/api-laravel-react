<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Models\Level;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LevelController extends Controller
{
    use HttpResponses;

    public function index()
    {
        return Level::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $req)
    {
        $validator = Validator::make($req->all(), [
            
            'nivel' => 'required'
        ]);

        if($validator->fails()){
            return $this->error('Dado Invalida', 400, $validator->errors());
        }

        $created = Level::create($validator->validate());

        if($created) {
            return $this->response('Nivel Criado', 200, $created);
        }
        return $this->error('Requisição incorreta', 400);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $req, string $id)
    {
        $validator = Validator::make($req->all(), [
            'nivel' => 'required',
        ]);

        if($validator->fails()){
            return $this->error('A validação falhou', 400, $validator->errors());
        }

        $validated = $validator->validated();

        $updated = Level::find($id)->update(
            [
                'nivel' => $validated['nivel'],
            ]
        );

        if($updated) {
            return $this->response('Nivel atualizado', 200, $req->all());
        }
            return $this->error('Requisição incorreta', 400);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Level $level)
{
    // Verificar se há desenvolvedores associados a este nível
    if ($level->developers()->exists()) {
        return $this->error('Nível não pode ser deletado porque está associado a desenvolvedores', 400);
    }

    // Tentar deletar o nível
    $deleted = $level->delete();

    // Verificar se a exclusão foi bem-sucedida
    if ($deleted) {
        return $this->response('Nível deletado', 204);
    }

    return $this->error('Nível não deletado', 400);
}

}
