import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadsModule } from '../uploads/uploads.module';
import { Produto } from './produto.entity';
import { ProdutosController } from './produtos.controller';
import { ProdutosSeedService } from './produtos-seed.service';
import { ProdutosService } from './produtos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Produto]), UploadsModule],
  controllers: [ProdutosController],
  providers: [ProdutosService, ProdutosSeedService],
})
export class ProdutosModule {}
