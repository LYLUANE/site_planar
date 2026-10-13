import { Transform } from 'class-transformer';
import { IsInt, IsString, Length, Matches, Max, Min } from 'class-validator';
import { REGEX_NOME_IMAGEM } from '../../uploads/uploads.service';

const aparar = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;

// Sem caracteres de controle (quebras invisíveis, bytes nulos etc.)
const TEXTO_SEGURO = /^[^\p{Cc}]*$/u;

export const MEDIDA_MINIMA_CM = 1;
export const MEDIDA_MAXIMA_CM = 500;

export class CriarProdutoDto {
  @Transform(aparar)
  @IsString()
  @Length(2, 80)
  @Matches(TEXTO_SEGURO, { message: 'nome contém caracteres inválidos' })
  nome!: string;

  @Transform(aparar)
  @IsString()
  @Length(5, 500)
  // como o nome, mas aceita quebra de linha e tab
  @Matches(/^(?:[^\p{Cc}]|[\n\r\t])*$/u, {
    message: 'descricao contém caracteres inválidos',
  })
  descricao!: string;

  // R$ 0,01 até R$ 1.000.000,00
  @IsInt()
  @Min(1)
  @Max(100_000_000)
  precoCentavos!: number;

  @IsInt()
  @Min(MEDIDA_MINIMA_CM)
  @Max(MEDIDA_MAXIMA_CM)
  largura!: number;

  @IsInt()
  @Min(MEDIDA_MINIMA_CM)
  @Max(MEDIDA_MAXIMA_CM)
  profundidade!: number;

  @IsInt()
  @Min(MEDIDA_MINIMA_CM)
  @Max(MEDIDA_MAXIMA_CM)
  altura!: number;

  // Nome devolvido por POST /api/uploads/imagens
  @IsString()
  @Matches(REGEX_NOME_IMAGEM, { message: 'imagem inválida' })
  imagem!: string;
}
