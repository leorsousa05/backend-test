<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\QueryException;
use Illuminate\Auth\AuthenticationException;
use Exception;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            $data = $request->validate([
                'name'     => 'required|string|max:255',
                'email'    => 'required|email|unique:users',
                'password' => 'required|string|min:6|confirmed',
                'role'     => 'sometimes|in:admin,client',
            ]);

            $data['role']     = $data['role'] ?? 'client';
            $data['password'] = bcrypt($data['password']);

            $user = User::create($data);

            return response()->json($user, 201);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Falha na validação.',
                'errors'  => $e->errors(),
            ], 422);
        } catch (QueryException $e) {
            return response()->json([
                'message' => 'Erro ao criar usuário no banco.',
                'error'   => $e->getMessage(),
            ], 500);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Erro interno ao registrar usuário.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    public function login(Request $request)
    {
        try {
            $creds = $request->validate([
                'email'    => 'required|email',
                'password' => 'required|string',
            ]);

            if (! Auth::attempt($creds)) {
                throw new AuthenticationException('Credenciais inválidas.');
            }

            $user  = Auth::user();
            $token = $user->createToken('api-token')->plainTextToken;

            return response()->json([
                'user'  => $user,
                'token' => $token,
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Falha na validação.',
                'errors'  => $e->errors(),
            ], 422);
        } catch (AuthenticationException $e) {
            return response()->json([
                'message' => $e->getMessage(),
            ], 401);
        } catch (QueryException $e) {
            return response()->json([
                'message' => 'Erro ao consultar banco de dados.',
                'error'   => $e->getMessage(),
            ], 500);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Erro interno no login.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            /** Revoga todos os tokens do usuário */
            $request->user()->tokens()->delete();
            return response()->json(null, 204);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Erro ao deslogar.',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }
}

