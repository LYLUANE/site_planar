import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploadsService } from '../uploads/uploads.service';
import { AtualizarProdutoDto } from './dto/atualizar-produto.dto';
import { CriarProdutoDto } from './dto/criar-produto.dto';
import { paraProdutoResposta, Produto } from './produto.entity';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto)
    private readonly produtos: Repository<Produto>,
    private readonly uploads: UploadsService,
  ) {}

  async listar() {
    const lista = await this.produtos.find({ order: { id: 'ASC' } });
    return lista.map(paraProdutoResposta);
  }

  async buscar(id: number) {
    return paraProdutoResposta(await this.buscarEntidade(id));
  }

  async criar(dto: CriarProdutoDto) {
    this.garantirImagem(dto.imagem);
    const produto = await this.produtos.save(this.produtos.create(dto));
    return paraProdutoResposta(produto);
  }

  async atualizar(id: number, dto: AtualizarProdutoDto) {
    const produto = await this.buscarEntidade(id);
    const imagemAntiga = produto.imagem;
    if (dto.imagem) this.garantirImagem(dto.imagem);

    const salvo = await this.produtos.save(this.produtos.merge(produto, dto));
    if (dto.imagem && dto.imagem !== imagemAntiga) {
      await this.removerImagemSeOrfa(imagemAntiga);
    }
    return paraProdutoResposta(salvo);
  }

  async remover(id: number) {
    const produto = await this.buscarEntidade(id);
    await this.produtos.remove(produto);
    await this.removerImagemSeOrfa(produto.imagem);
  }

  private async buscarEntidade(id: number) {
    const produto = await this.produtos.findOneBy({ id });
    if (!produto) throw new NotFoundException('Produto não encontrado');
    return produto;
  }

  private garantirImagem(nome: string) {
    if (!this.uploads.existe(nome)) {
      throw new BadRequestException('Imagem não encontrada: envie-a primeiro');
    }
  }

  private async removerImagemSeOrfa(nome: string) {
    if (!(await this.produtos.existsBy({ imagem: nome }))) {
      await this.uploads.remover(nome);
    }
  }
}
