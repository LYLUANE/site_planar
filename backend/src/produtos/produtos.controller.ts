import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Papeis, Publico } from '../auth/decorators';
import { AtualizarProdutoDto } from './dto/atualizar-produto.dto';
import { CriarProdutoDto } from './dto/criar-produto.dto';
import { ProdutosService } from './produtos.service';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtos: ProdutosService) {}

  @Publico()
  @Get()
  listar() {
    return this.produtos.listar();
  }

  @Publico()
  @Get(':id')
  buscar(@Param('id', ParseIntPipe) id: number) {
    return this.produtos.buscar(id);
  }

  @Papeis('admin')
  @Post()
  criar(@Body() dto: CriarProdutoDto) {
    return this.produtos.criar(dto);
  }

  @Papeis('admin')
  @Patch(':id')
  atualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: AtualizarProdutoDto,
  ) {
    return this.produtos.atualizar(id, dto);
  }

  @Papeis('admin')
  @Delete(':id')
  @HttpCode(204)
  remover(@Param('id', ParseIntPipe) id: number) {
    return this.produtos.remover(id);
  }
}
