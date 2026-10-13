import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'node:crypto';
import { copyFile, mkdir, unlink, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { VariaveisAmbiente } from '../config/env.validation';

// Nome de arquivo aceito em qualquer lugar da API: sem barras nem "..",
// impossível sair da pasta de uploads (path traversal)
export const REGEX_NOME_IMAGEM = /^[a-z0-9-]{1,64}\.(jpe?g|png|webp)$/;

export const TAMANHO_MAXIMO_IMAGEM = 2 * 1024 * 1024; // 2 MB

// Identifica o tipo pelos primeiros bytes do arquivo (assinatura), e não pelo
// nome ou pelo Content-Type que o navegador mandou — esses podem ser forjados
function detectarExtensao(buffer: Buffer): 'jpg' | 'png' | 'webp' | null {
  if (buffer.length < 12) return null;
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return 'jpg';
  }
  if (
    buffer
      .subarray(0, 8)
      .equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
  ) {
    return 'png';
  }
  if (
    buffer.toString('ascii', 0, 4) === 'RIFF' &&
    buffer.toString('ascii', 8, 12) === 'WEBP'
  ) {
    return 'webp';
  }
  return null;
}

@Injectable()
export class UploadsService {
  readonly pasta: string;

  constructor(config: ConfigService<VariaveisAmbiente, true>) {
    this.pasta = resolve(config.get('UPLOADS_DIR', { infer: true }));
  }

  private caminho(nome: string) {
    if (!REGEX_NOME_IMAGEM.test(nome)) {
      throw new BadRequestException('Nome de imagem inválido');
    }
    return join(this.pasta, nome);
  }

  async salvarImagem(arquivo?: Express.Multer.File) {
    if (!arquivo) throw new BadRequestException('Envie um arquivo de imagem');

    const extensao = detectarExtensao(arquivo.buffer);
    if (!extensao) {
      throw new BadRequestException('Formato inválido: use JPG, PNG ou WEBP');
    }

    await mkdir(this.pasta, { recursive: true });
    const nome = `${randomUUID()}.${extensao}`;
    await writeFile(this.caminho(nome), arquivo.buffer, { flag: 'wx' });
    return { imagem: nome, url: `/uploads/${nome}` };
  }

  existe(nome: string) {
    return existsSync(this.caminho(nome));
  }

  async copiarParaUploads(origem: string, nome: string) {
    await mkdir(this.pasta, { recursive: true });
    await copyFile(origem, this.caminho(nome));
  }

  async remover(nome: string) {
    await unlink(this.caminho(nome)).catch(() => undefined);
  }
}
