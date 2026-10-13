import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

// Roda antes de qualquer import dos testes: o ConfigModule lê o process.env
// no momento em que o AppModule é importado.
// Ambiente isolado: banco em memória e pasta de uploads temporária.
Object.assign(process.env, {
  JWT_SECRET: 'x'.repeat(48),
  ADMIN_LOGIN: 'admin.teste',
  ADMIN_SENHA: 'senha-forte-123',
  DB_TYPE: 'sqlite',
  DB_SQLITE_ARQUIVO: ':memory:',
  UPLOADS_DIR: mkdtempSync(join(tmpdir(), 'planar-uploads-')),
  FRONTEND_URL: 'http://localhost:5173',
});
