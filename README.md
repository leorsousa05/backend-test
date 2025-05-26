# Projeto de Gestão e Vitrine de Produtos

Este repositório contém um sistema completo para gestão administrativa e apresentação pública de produtos.

## Tecnologias Utilizadas

- **PHP 8.x & Laravel 10.x** (Backend)
- **React 18.x** com React Router v6 (Frontend)
- **Tailwind CSS**
- **MySQL**
- **Laravel Sanctum** para autenticação
- **react-toastify** para notificações

## Instruções de Instalação e Execução

### Backend (Laravel)
1. Navegue até a pasta do backend.
2. Instale as dependências:
   ```bash
   composer install
   ```
3. Copie o arquivo de ambiente e ajuste as variáveis:
   ```bash
   cp .env.example .env
   # configure DB_CONNECTION, DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD
   ```
4. Gere a chave da aplicação:
   ```bash
   php artisan key:generate
   ```
5. Execute migrations e seeders:
   ```bash
   php artisan migrate --seed
   ```
6. Inicie o servidor:
   ```bash
   php artisan serve
   ```
   A API ficará disponível em `http://localhost:8000/api`

### Frontend (React)
1. Na raiz do projeto (onde estão `css/` e `js/`), instale as dependências:
   ```bash
   npm install
   ```
2. Copie e ajuste variáveis de ambiente:
   ```bash
   cp .env.example .env
   # defina VITE_API_URL=http://localhost:8000/api
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   O frontend estará disponível em `http://localhost:8000`

## Documentação dos Endpoints da API

Base URL: `http://localhost:8000/api`

| Método | Rota                 | Descrição                |
| ------ | -------------------- | ------------------------ |
| GET    | `/products`          | Listar todos os produtos |
| GET    | `/products/{id}`     | Exibir um produto        |
| POST   | `/products`          | Criar novo produto       |
| PUT    | `/products/{id}`     | Atualizar produto        |
| DELETE | `/products/{id}`     | Remover produto          |

- Respostas de sucesso retornam JSON com dados ou mensagem.
- Erros de validação retornam **422** com estrutura `{ errors: {...} }`.

## Acesso ao CMS (Administração)

1. Abra o navegador em `http://localhost:8000/login`.
2. Faça login com credenciais cadastradas no seeder (por exemplo: `admin@example.com` / `password`).
3. Após autenticar, você terá acesso ao menu lateral para:
   - **Dashboard**: estatísticas dos produtos
   - **Produtos**: criar, editar, excluir e visualizar
   - **Usuários**: gerenciar usuários do sistema

## Estrutura de Pastas

```
.
├─ css/
│  └─ app.css               # estilos globais
├─ js/
│  ├─ auth/pages/Login.tsx  # tela de login
│  ├─ dashboard/pages/
│  │  └─ Dashboard.tsx      # painel administrativo
│  ├─ admin/
│  │  ├─ components/        # UserForm, UserTable
│  │  └─ pages/Users.tsx    # CRUD de usuários
│  ├─ products/pages/
│  │  ├─ Products.tsx       # listagem CMS
│  │  ├─ ProductCreate.tsx
│  │  ├─ ProductShow.tsx
│  │  └─ ProductEdit.tsx
│  ├─ store/
│  │  ├─ components/        # StoreHeader, HeroBanner, etc
│  │  └─ pages/StorePage.tsx# frontend público
│  ├─ shared/
│  │  ├─ components/        # Navbar, Sidebar, Modal
│  │  └─ contexts/          # AuthContext, ProductsContext
│  ├─ App.tsx               # definição de rotas
│  └─ main.tsx              # entrada React
└─ views/index.blade.php    # arquivo blade exemplo
```

---

_Dump do banco de dados disponível em `bd.sql`_

