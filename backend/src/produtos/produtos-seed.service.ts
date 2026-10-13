import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { join, resolve } from 'node:path';
import { Repository } from 'typeorm';
import { VariaveisAmbiente } from '../config/env.validation';
import { UploadsService } from '../uploads/uploads.service';
import { Produto } from './produto.entity';

const PRODUTOS_INICIAIS: Omit<Produto, 'id' | 'criadoEm' | 'atualizadoEm'>[] = [
  {
    nome: 'Criado-mudo',
    descricao:
      'Criado-mudo em madeira pinus envernizada com estrutura de metalon.',
    precoCentavos: 28000,
    largura: 45,
    profundidade: 35,
    altura: 55,
    imagem: 'criado-mudo.jpeg',
  },
  {
    nome: 'Escada Auxiliar',
    descricao:
      'Escada auxiliar de 2 degraus em madeira pinus envernizada com estrutura de metalon.',
    precoCentavos: 19000,
    largura: 40,
    profundidade: 40,
    altura: 45,
    imagem: 'escada.jpeg',
  },
  {
    nome: 'Mesa de Escritório',
    descricao:
      'Mesa de escritório/estudo em madeira pinus envernizada com estrutura de metalon.',
    precoCentavos: 58000,
    largura: 120,
    profundidade: 60,
    altura: 75,
    imagem: 'mesa-escritorio.jpeg',
  },
  {
    nome: 'Moldura Decorativa',
    descricao:
      'Moldura de quadro decorativo com estrutura minimalista em metalon.',
    precoCentavos: 9500,
    largura: 30,
    profundidade: 2,
    altura: 30,
    imagem: 'moldura.jpeg',
  },
  {
    nome: 'Estante',
    descricao:
      'Estante com três planos de madeira maciça de 30mm apoiados em colunas de aço escovado.',
    precoCentavos: 145000,
    largura: 90,
    profundidade: 34,
    altura: 180,
    imagem: 'estante.jpeg',
  },
  {
    nome: 'Mesa Industrial',
    descricao:
      'Mesa Industrial com tampo maciço sobre base tubular de aço escovado.',
    precoCentavos: 189000,
    largura: 160,
    profundidade: 78,
    altura: 80,
    imagem: 'mesa-industrial.jpeg',
  },
];

@Injectable()
export class ProdutosSeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(ProdutosSeedService.name);

  constructor(
    @InjectRepository(Produto)
    private readonly produtos: Repository<Produto>,
    private readonly uploads: UploadsService,
    private readonly config: ConfigService<VariaveisAmbiente, true>,
  ) {}

  async onApplicationBootstrap() {
    if (!this.config.get('SEED_PRODUTOS', { infer: true })) return;
    if ((await this.produtos.count()) > 0) return;

    const pastaSeed = resolve('seed', 'imagens');
    for (const produto of PRODUTOS_INICIAIS) {
      await this.uploads.copiarParaUploads(
        join(pastaSeed, produto.imagem),
        produto.imagem,
      );
    }
    await this.produtos.save(this.produtos.create(PRODUTOS_INICIAIS));
    this.logger.log(
      `${PRODUTOS_INICIAIS.length} produtos iniciais cadastrados`,
    );
  }
}
