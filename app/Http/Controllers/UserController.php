<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\QueryException;
use Exception;

class UserController extends Controller
{
    public function index()
    {
        try {
            $users = User::all();
            return response()->json($users, 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Não foi possível listar os usuários.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $data = $request->validate([
                'name'     => 'required|string|max:255',
                'email'    => 'required|email|unique:users',
                'password' => 'required|string|min:6',
                'role'     => 'sometimes|in:admin,client',
            ]);

            $data['role']     = $data['role'] ?? 'client';
            $data['password'] = bcrypt($data['password']);

            $user = User::create($data);

            return response()->json($user, 201);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Dados inválidos.',
                'errors'  => $e->errors(),
            ], 422);
        } catch (QueryException $e) {
            return response()->json([
                'message' => 'Erro ao salvar o usuário no banco de dados.',
                'error'   => $e->getMessage(),
            ], 500);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Ocorreu um erro ao criar o usuário.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $user = User::findOrFail($id);
            return response()->json($user, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Usuário não encontrado.',
            ], 404);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Erro ao buscar o usuário.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $user = User::findOrFail($id);

            $data = $request->validate([
                'name'     => 'sometimes|required|string|max:255',
                'email'    => 'sometimes|required|email|unique:users,email,'.$user->id,
                'password' => 'sometimes|required|string|min:6',
                'role'     => 'sometimes|in:admin,client',
            ]);

            if (isset($data['password'])) {
                $data['password'] = bcrypt($data['password']);
            }

            $user->update($data);

            return response()->json($user, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Usuário não encontrado.',
            ], 404);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Dados inválidos.',
                'errors'  => $e->errors(),
            ], 422);
        } catch (QueryException $e) {
            return response()->json([
                'message' => 'Erro ao atualizar o usuário no banco de dados.',
                'error'   => $e->getMessage(),
            ], 500);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Ocorreu um erro ao atualizar o usuário.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $user = User::findOrFail($id);
            $user->delete();
            return response()->json(null, 204);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Usuário não encontrado.',
            ], 404);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Erro ao remover o usuário.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }
}

