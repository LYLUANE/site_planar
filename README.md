# PLANAR — Móveis Industriais

Loja com catálogo, carrinho com **medidas personalizadas**, pedido via WhatsApp e
**painel administrativo** para cadastrar produtos e preços.

- **Frontend:** React + Vite + MUI + three.js (esta pasta)
- **Backend:** NestJS + SQLite (pasta [`backend/`](backend/README.md))

## Rodando localmente

```bash
# 1. Backend
cd backend
npm install
cp .env.example .env     # preencha JWT_SECRET, ADMIN_LOGIN e ADMIN_SENHA
npm run start:dev        # http://localhost:3000/api

# 2. Frontend (em outro terminal, na raiz)
npm install
npm run dev              # http://localhost:5173/site_planar/
```

O frontend usa `VITE_API_URL` (já definido em `.env.development` como
`http://localhost:3000`).

## Rotas do site

| Rota      | O que é                                                    |
|-----------|------------------------------------------------------------|
| `/`       | Loja: catálogo vindo da API, carrinho, pedido no WhatsApp  |
| `/login`  | Login do administrador (JWT)                               |
| `/admin`  | Cadastro, edição e remoção de produtos (só admin)          |

## Organização do frontend

```
src/
├── api/          chamadas HTTP (cliente com token, produtos, auth, sessão)
├── hooks/        useProdutos, useSalvarProduto, useRemoverProduto,
│                 useAuth (contexto de login), useCarrinho
├── pages/        Login e Admin (carregadas sob demanda)
├── components/   MedidasDialog, RotaAdmin, admin/ProdutoFormDialog
└── *.tsx         seções da loja (Header, Head, Major, Bag, Footer…)
```

## Deploy (GitHub Pages)

O workflow `.github/workflows/deploy.yml` publica a cada push na `develop`.
Para a loja funcionar online, o backend precisa estar hospedado e o endereço
dele configurado em **Settings › Secrets and variables › Actions › Variables**
como `VITE_API_URL`. Inclua também `https://lyluane.github.io` no
`FRONTEND_URL` do `.env` do backend.
