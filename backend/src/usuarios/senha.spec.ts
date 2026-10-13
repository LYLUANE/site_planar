import { conferirSenha, gerarHashSenha } from './senha';

describe('senha', () => {
  it('confere a senha correta e recusa a errada', async () => {
    const hash = await gerarHashSenha('minha-senha-123');
    await expect(conferirSenha('minha-senha-123', hash)).resolves.toBe(true);
    await expect(conferirSenha('minha-senha-124', hash)).resolves.toBe(false);
  });

  it('gera hashes diferentes para a mesma senha (salt aleatório)', async () => {
    const [a, b] = await Promise.all([
      gerarHashSenha('mesma-senha'),
      gerarHashSenha('mesma-senha'),
    ]);
    expect(a).not.toBe(b);
    expect(a).not.toContain('mesma-senha');
  });

  it('recusa hash em formato desconhecido', async () => {
    await expect(conferirSenha('qualquer', 'texto-puro')).resolves.toBe(false);
  });
});
