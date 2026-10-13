import { plainToInstance, Transform } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
  MinLength,
  ValidateIf,
  validateSync,
} from 'class-validator';

// Variáveis lidas do .env. A aplicação NÃO sobe se alguma obrigatória estiver
// faltando ou fraca — melhor falhar no boot do que rodar inseguro.
export class VariaveisAmbiente {
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  @Max(65535)
  PORT: number = 3000;

  // Origens que podem chamar a API (separadas por vírgula)
  @IsString()
  FRONTEND_URL: string = 'http://localhost:5173';

  @IsString()
  @MinLength(32, { message: 'JWT_SECRET precisa ter pelo menos 32 caracteres' })
  JWT_SECRET!: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d+[smhd]$/, {
    message: 'JWT_EXPIRA_EM deve ser algo como 15m, 1h ou 1d',
  })
  JWT_EXPIRA_EM: string = '1h';

  // Login e senha do administrador, escolhidos pelo dono do site
  @IsString()
  @Matches(/^[a-zA-Z0-9._@-]{3,50}$/, {
    message:
      'ADMIN_LOGIN deve ter 3 a 50 caracteres (letras, números, . _ @ -)',
  })
  ADMIN_LOGIN!: string;

  @IsString()
  @MinLength(8, { message: 'ADMIN_SENHA precisa ter pelo menos 8 caracteres' })
  ADMIN_SENHA!: string;

  @IsOptional()
  @IsIn(['sqlite', 'postgres'])
  DB_TYPE: 'sqlite' | 'postgres' = 'sqlite';

  @IsOptional()
  @IsString()
  DB_SQLITE_ARQUIVO: string = 'data/planar.sqlite';

  @ValidateIf((env: VariaveisAmbiente) => env.DB_TYPE === 'postgres')
  @IsString()
  DATABASE_URL?: string;

  @IsOptional()
  @IsString()
  UPLOADS_DIR: string = 'uploads';

  // Cadastra os 6 produtos iniciais quando o banco está vazio
  @IsOptional()
  @Transform(({ value }) => value !== 'false' && value !== false)
  SEED_PRODUTOS: boolean = true;
}

export function validarAmbiente(config: Record<string, unknown>) {
  const env = plainToInstance(VariaveisAmbiente, config);
  const erros = validateSync(env, { skipMissingProperties: false });
  if (erros.length > 0) {
    const mensagens = erros.flatMap((e) => Object.values(e.constraints ?? {}));
    throw new Error(
      `Configuração inválida no .env:\n- ${mensagens.join('\n- ')}`,
    );
  }
  return env;
}
