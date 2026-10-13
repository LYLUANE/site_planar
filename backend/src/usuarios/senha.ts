import {
  randomBytes,
  scrypt,
  ScryptOptions,
  timingSafeEqual,
} from 'node:crypto';

// Hash de senha com scrypt (nativo do Node). Formato salvo no banco:
// scrypt$N$r$p$salt$hash — os parâmetros ficam junto para permitir ajustá-los no futuro.
const PARAMS = { N: 16384, r: 8, p: 1 };
const TAMANHO_CHAVE = 64;

function derivar(
  senha: string,
  salt: Buffer,
  opcoes: ScryptOptions,
): Promise<Buffer> {
  return new Promise((ok, falha) =>
    scrypt(senha, salt, TAMANHO_CHAVE, opcoes, (erro, chave) =>
      erro ? falha(erro) : ok(chave),
    ),
  );
}

export async function gerarHashSenha(senha: string): Promise<string> {
  const salt = randomBytes(16);
  const hash = await derivar(senha, salt, PARAMS);
  const { N, r, p } = PARAMS;
  return [
    'scrypt',
    N,
    r,
    p,
    salt.toString('base64'),
    hash.toString('base64'),
  ].join('$');
}

export async function conferirSenha(
  senha: string,
  hashSalvo: string,
): Promise<boolean> {
  const [algoritmo, N, r, p, saltB64, hashB64] = hashSalvo.split('$');
  if (algoritmo !== 'scrypt' || !hashB64) return false;

  const esperado = Buffer.from(hashB64, 'base64');
  const calculado = await derivar(senha, Buffer.from(saltB64, 'base64'), {
    N: Number(N),
    r: Number(r),
    p: Number(p),
  });
  // comparação em tempo constante: não vaza quantos bytes bateram
  return (
    calculado.length === esperado.length && timingSafeEqual(calculado, esperado)
  );
}
