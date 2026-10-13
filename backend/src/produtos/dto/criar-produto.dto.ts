import { Transform } from 'class-transformer';
import { IsInt, IsString, Length, Matches, Max, Min } from 'class-validator';
import { REGEX_NOME_IMAGEM } from '../../uploads/uploads.service';

const aparar = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;

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
  @Matches(/^(?:[^\p{Cc}]|[\n\r\t])*$/u, {
    message: 'descricao contém caracteres inválidos',
  })
  descricao!: string;

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

  @IsString()
  @Matches(REGEX_NOME_IMAGEM, { message: 'imagem inválida' })
  imagem!: string;
}
