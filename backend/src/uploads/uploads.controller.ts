import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { Papeis } from '../auth/decorators';
import { TAMANHO_MAXIMO_IMAGEM, UploadsService } from './uploads.service';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploads: UploadsService) {}

  @Papeis('admin')
  @Post('imagens')
  @UseInterceptors(
    FileInterceptor('arquivo', {
      storage: memoryStorage(),
      limits: { fileSize: TAMANHO_MAXIMO_IMAGEM, files: 1, fields: 0 },
    }),
  )
  enviarImagem(@UploadedFile() arquivo?: Express.Multer.File) {
    return this.uploads.salvarImagem(arquivo);
  }
}
