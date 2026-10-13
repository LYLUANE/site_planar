# Planar — API

Backend da loja PLANAR em **NestJS** + **TypeORM** + **SQLite** (ou Postgres).

## Rodando

```bash
cd backend
npm install
cp .env.example .env   # preencha JWT_SECRET, ADMIN_LOGIN e ADMIN_SENHA
npm run start:dev
```

A API sobe em `http://localhost:3000/api`. Na primeira execução ela:

- cria o banco em `data/planar.sqlite`;
- cria o administrador com o `ADMIN_LOGIN` / `ADMIN_SENHA` do `.env`
  (se você trocar a senha no `.env`, ela é atualizada no próximo boot);
- cadastra os 6 produtos que antes estavam fixos no frontend.

Se alguma variável obrigatória estiver faltando ou fraca, a API **não sobe** e
diz qual é o problema.

## Estrutura (uma pasta por feature)

```
src/
├── auth/        login (JWT), guards e decorators @Publico() / @Papeis()
├── usuarios/    entidade Usuario, hash de senha (scrypt), criação do admin
├── produtos/    CRUD de produtos + cadastro inicial
├── uploads/     envio e validação das fotos dos produtos
├── config/      validação do .env
└── configurar-app.ts   helmet, CORS, validação global, arquivos estáticos
```

## Rotas

| Método | Rota                    | Acesso  | Descrição                         |
|--------|-------------------------|---------|-----------------------------------|
| POST   | `/api/auth/login`       | público | `{ login, senha }` → token JWT    |
| GET    | `/api/auth/me`          | logado  | usuário do token                  |
| GET    | `/api/produtos`         | público | lista de produtos                 |
| GET    | `/api/produtos/:id`     | público | um produto                        |
| POST   | `/api/produtos`         | admin   | cadastra                          |
| PATCH  | `/api/produtos/:id`     | admin   | edita (campos parciais)           |
| DELETE | `/api/produtos/:id`     | admin   | remove                            |
| POST   | `/api/uploads/imagens`  | admin   | form-data `arquivo` (JPG/PNG/WEBP, até 2 MB) |
| GET    | `/uploads/<arquivo>`    | público | imagem do produto                 |

Preços trafegam em **centavos** (`precoCentavos: 189000` = R$ 1.890,00) e as
medidas em **centímetros** (`largura`, `profundidade`, `altura`).

## Segurança

- **Toda rota exige token por padrão**; as públicas são marcadas com `@Publico()`.
- **SQL injection:** só consultas parametrizadas do TypeORM, nada de SQL
  concatenado. Além disso o login só aceita `[a-zA-Z0-9._@-]`.
- **Payload:** `ValidationPipe` com `whitelist` + `forbidNonWhitelisted`: campo
  fora do DTO → 400. Tipos, tamanhos e faixas validados; JSON limitado a 20 KB.
- **Senhas:** scrypt com salt aleatório, comparação em tempo constante; o hash
  nunca sai do banco (`select: false`) nem aparece nas respostas.
- **JWT:** HS256 fixo (tokens `alg: none` são recusados), segredo de 32+
  caracteres, expiração curta (1h). O token só carrega o id; o usuário é
  conferido no banco a cada requisição.
- **Força bruta:** 5 tentativas de login por minuto por IP; 100 req/min no geral.
  Mesma mensagem e mesmo tempo de resposta para login inexistente e senha errada.
- **Uploads:** tipo detectado pelos bytes do arquivo (não pelo nome), nome
  aleatório gerado pelo servidor, regex que impede path traversal, `nosniff`.
- **Headers:** helmet; CORS só para as origens em `FRONTEND_URL`.

## Testes

```bash
npm test          # unitários
npm run test:e2e  # API completa com banco em memória, incluindo tentativas de ataque
```

## Produção

- Use `DB_TYPE=postgres` + `DATABASE_URL`. O `synchronize` do TypeORM cria as
  tabelas automaticamente; com dados importantes, troque por migrations.
- A pasta `uploads/` precisa de disco persistente (ou troque por S3/Cloudinary).
- Se ficar atrás de proxy (Render, Railway…), habilite `trust proxy` para o
  limite por IP funcionar corretamente.
