import { NestExpressApplication } from '@nestjs/platform-express';
import { Test } from '@nestjs/testing';
import { rmSync } from 'node:fs';
import request from 'supertest';
import type { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { configurarApp } from '../src/configurar-app';

const ADMIN = {
  login: process.env.ADMIN_LOGIN!,
  senha: process.env.ADMIN_SENHA!,
};

const PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
);

interface ProdutoResposta {
  id: number;
  nome: string;
  precoCentavos: number;
  imagem: string;
}

describe('API Planar (e2e)', () => {
  let app: NestExpressApplication;
  let http: App;
  let token: string;

  beforeAll(async () => {
    const modulo = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = modulo.createNestApplication<NestExpressApplication>();
    configurarApp(app);
    await app.init();
    http = app.getHttpServer();

    const res = await request(http)
      .post('/api/auth/login')
      .send(ADMIN)
      .expect(200);
    token = (res.body as { accessToken: string }).accessToken;
  });

  afterAll(async () => {
    await app?.close();
    rmSync(process.env.UPLOADS_DIR!, { recursive: true, force: true });
  });

  const auth = () => ({ Authorization: `Bearer ${token}` });

  describe('produtos (público)', () => {
    it('lista os 6 produtos iniciais com preço em centavos', async () => {
      const res = await request(http).get('/api/produtos').expect(200);
      const produtos = res.body as ProdutoResposta[];
      expect(produtos).toHaveLength(6);
      expect(produtos[0]).toMatchObject({
        nome: 'Criado-mudo',
        precoCentavos: 28000,
        medidas: { largura: 45, profundidade: 35, altura: 55 },
      });
    });

    it('serve a imagem do produto', async () => {
      await request(http)
        .get('/uploads/criado-mudo.jpeg')
        .expect(200)
        .expect('X-Content-Type-Options', 'nosniff');
    });

    it('id que não é número → 400', () =>
      request(http).get('/api/produtos/1%20OR%201=1').expect(400));
  });

  describe('login', () => {
    it('senha errada → 401 com mensagem genérica', async () => {
      const res = await request(http)
        .post('/api/auth/login')
        .send({ login: ADMIN.login, senha: 'senha-errada-000' })
        .expect(401);
      expect((res.body as { message: string }).message).toBe(
        'Login ou senha incorretos',
      );
    });

    it('SQL injection no login é recusado antes de chegar ao banco', () =>
      request(http)
        .post('/api/auth/login')
        .send({ login: "' OR '1'='1' --", senha: "' OR '1'='1' --" })
        .expect(400));

    it('a resposta do login não vaza o hash da senha', async () => {
      const res = await request(http)
        .get('/api/auth/me')
        .set(auth())
        .expect(200);
      expect(res.body).toEqual({ id: 1, login: ADMIN.login, papel: 'admin' });
    });
  });

  describe('proteção das rotas de admin', () => {
    const novo = {
      nome: 'Banco',
      descricao: 'Banco de madeira maciça.',
      precoCentavos: 35000,
      largura: 100,
      profundidade: 35,
      altura: 45,
      imagem: 'escada.jpeg',
    };

    it('sem token → 401', () =>
      request(http).post('/api/produtos').send(novo).expect(401));

    it('token adulterado → 401', () =>
      request(http)
        .post('/api/produtos')
        .set({ Authorization: `Bearer ${token.slice(0, -2)}xx` })
        .send(novo)
        .expect(401));

    it('token com "alg: none" → 401', () => {
      const b64 = (o: object) =>
        Buffer.from(JSON.stringify(o)).toString('base64url');
      const falso = `${b64({ alg: 'none', typ: 'JWT' })}.${b64({ sub: 1 })}.`;
      return request(http)
        .post('/api/produtos')
        .set({ Authorization: `Bearer ${falso}` })
        .send(novo)
        .expect(401);
    });

    it('campo extra no payload → 400', () =>
      request(http)
        .post('/api/produtos')
        .set(auth())
        .send({ ...novo, id: 999, papel: 'admin' })
        .expect(400));

    it('preço quebrado, negativo ou texto → 400', async () => {
      for (const precoCentavos of [10.5, -1, '100']) {
        await request(http)
          .post('/api/produtos')
          .set(auth())
          .send({ ...novo, precoCentavos })
          .expect(400);
      }
    });

    it('imagem com path traversal → 400', () =>
      request(http)
        .post('/api/produtos')
        .set(auth())
        .send({ ...novo, imagem: '../../etc/passwd' })
        .expect(400));

    it('admin cria, edita e remove produto', async () => {
      const criado = await request(http)
        .post('/api/produtos')
        .set(auth())
        .send(novo)
        .expect(201);
      const { id } = criado.body as ProdutoResposta;

      const editado = await request(http)
        .patch(`/api/produtos/${id}`)
        .set(auth())
        .send({ precoCentavos: 39900 })
        .expect(200);
      expect((editado.body as ProdutoResposta).precoCentavos).toBe(39900);

      await request(http).delete(`/api/produtos/${id}`).set(auth()).expect(204);
      await request(http).get(`/api/produtos/${id}`).expect(404);
    });
  });

  describe('upload de imagem', () => {
    it('sem token → 401', () =>
      request(http)
        .post('/api/uploads/imagens')
        .attach('arquivo', PNG, 'foto.png')
        .expect(401));

    it('arquivo que não é imagem (mesmo com nome .jpg) → 400', () =>
      request(http)
        .post('/api/uploads/imagens')
        .set(auth())
        .attach('arquivo', Buffer.from('<script>alert(1)</script>'), {
          filename: 'foto.jpg',
          contentType: 'image/jpeg',
        })
        .expect(400));

    it('PNG válido → salvo com nome aleatório', async () => {
      const res = await request(http)
        .post('/api/uploads/imagens')
        .set(auth())
        .attach('arquivo', PNG, '../../malicioso.png')
        .expect(201);
      expect((res.body as { imagem: string }).imagem).toMatch(
        /^[0-9a-f-]{36}\.png$/,
      );
    });
  });
});
