<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Models\Developers;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DevelopersController extends Controller
{
   use HttpResponses;

    public function index()
    {
        $developers = Developers::with('levels')->get();
        return response()->json($developers);
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
            'levels_id' => 'required',
            'nome' => 'required',
            'sexo' => 'required|max:1',
            'data_nascimento' => 'required',
            'idade' => 'required|integer',
            'hobby' => 'required'
        ]);

        if($validator->fails()){
            return $this->error('Data Invalida', 400, $validator->errors());
        }

        $created = Developers::create($validator->validate());

        if($created) {
            return $this->response('Desenvoldedor Criado', 201, $created);
        }
        return $this->error('Requisição incorreta', 400);
    }

    /**
     * Display the specified resource.
     */
    public function show(String $id)
    {
        
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
            'levels_id' => 'required',
            'nome' => 'required',
            'sexo' => 'required|max:1',
            'data_nascimento' => 'required',
            'idade' => 'required|integer',
            'hobby' => 'required'
        ]);

        if($validator->fails()){
            return $this->error('A validação falhou', 400, $validator->errors());
        }

        $validated = $validator->validated();

        $updated = Developers::find($id)->update(
            [
                'levels_id' => $validated['levels_id'],
                'nome' => $validated['nome'],
                'sexo' => $validated['sexo'],
                'data_nascimento' => $validated['data_nascimento'],
                'idade' => $validated['idade'],
                'hobby' => $validated['hobby']
            ]
        );

        if($updated) {
            return $this->response('Desenvoldedor atualizado', 200, $req->all());
        }
            return $this->error('Requisição incorreta', 400);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Developers $developer) 
    {
      
        $deleted = $developer->delete();

        if ($deleted) {
          return $this->response('Desenvolvedor deletado', 204);
        }
        return $this->error('Desenvolvedor não deletado', 400);
      }
    }
