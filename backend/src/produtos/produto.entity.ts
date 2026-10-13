import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('produtos')
export class Produto {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 80 })
  nome!: string;

  @Column({ length: 500 })
  descricao!: string;

  @Column({ name: 'preco_centavos', type: 'integer' })
  precoCentavos!: number;

  @Column({ type: 'integer' })
  largura!: number;

  @Column({ type: 'integer' })
  profundidade!: number;

  @Column({ type: 'integer' })
  altura!: number;

  @Column({ length: 100 })
  imagem!: string;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm!: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm!: Date;
}

export function paraProdutoResposta(p: Produto) {
  return {
    id: p.id,
    nome: p.nome,
    descricao: p.descricao,
    precoCentavos: p.precoCentavos,
    medidas: {
      largura: p.largura,
      profundidade: p.profundidade,
      altura: p.altura,
    },
    imagem: p.imagem,
    imagemUrl: `/uploads/${p.imagem}`,
  };
}

export type ProdutoResposta = ReturnType<typeof paraProdutoResposta>;
