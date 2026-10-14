# PLANAR — Móveis Industriais

Loja com catálogo, carrinho com **medidas personalizadas**, pedido via WhatsApp e
**painel administrativo** para cadastrar produtos e preços.

```
landing-page-3d/
├── frontend/   React + Vite + MUI + three.js
├── backend/    NestJS + SQLite  (detalhes em backend/README.md)
└── .github/    deploy do frontend no GitHub Pages
```

## Rodando localmente

```bash
# 1. Backend
cd backend
npm install
cp .env.example .env     # preencha JWT_SECRET, ADMIN_LOGIN e ADMIN_SENHA
npm run start:dev        # http://localhost:3000/api

# 2. Frontend (em outro terminal)
cd frontend
npm install
npm run dev              # http://localhost:5173/site_planar/
```

O frontend usa `VITE_API_URL` (já definido em `frontend/.env.development` como
`http://localhost:3000`).

## Rotas do site

| Rota      | O que é                                                    |
|-----------|------------------------------------------------------------|
| `/`       | Loja: catálogo vindo da API, carrinho, pedido no WhatsApp  |
| `/login`  | Login do administrador (JWT)                               |
| `/admin`  | Cadastro, edição e remoção de produtos (só admin)          |

## Idiomas (PT / EN)

O site é bilíngue, com seletor **PT | EN** no topo da loja, no login e no painel.
O idioma inicial segue o navegador do visitante e pode ser forçado pela URL:
`/site_planar/?lang=en` ou `?lang=pt`. Os textos ficam em
`frontend/src/i18n/textos.ts` (o TypeScript acusa se faltar alguma tradução).

## Organização do frontend

```
frontend/src/
├── api/          chamadas HTTP (cliente com token, produtos, auth, sessão)
├── hooks/        useProdutos, useSalvarProduto, useRemoverProduto,
│                 useAuth (contexto de login), useCarrinho
├── pages/        Login e Admin (carregadas sob demanda)
├── components/   MedidasDialog, RotaAdmin, admin/ProdutoFormDialog
└── *.tsx         seções da loja (Header, Head, Major, Bag, Footer…)
```

## Deploy (GitHub Pages) e modo demonstração

O workflow `.github/workflows/deploy.yml` publica o frontend a cada push na `develop`.

Enquanto a variável `VITE_API_URL` não estiver configurada no repositório, o site
publicado roda em **modo demonstração**: os produtos, o carrinho, o login e o
painel admin funcionam sem backend, com os dados salvos no navegador de cada
visitante. Credenciais da demonstração: **demo / planar123** (aparecem na tela de
login). No painel, "Restaurar produtos" volta ao catálogo original.

Para testar o modo demonstração localmente:

```bash
cd frontend
VITE_MODO_DEMO=true npm run dev
```

Para usar o backend real em produção, hospede a API (pasta `backend/`), cadastre
o endereço dela em **Settings › Secrets and variables › Actions › Variables**
como `VITE_API_URL` e inclua `https://lyluane.github.io` no `FRONTEND_URL` do
backend. O modo demonstração desliga sozinho no próximo deploy.
