import { PartialType } from '@nestjs/mapped-types';
import { CriarProdutoDto } from './criar-produto.dto';

// Mesmas regras do cadastro, mas todos os campos opcionais
export class AtualizarProdutoDto extends PartialType(CriarProdutoDto) {}
