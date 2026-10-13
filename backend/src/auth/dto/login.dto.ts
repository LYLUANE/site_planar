import { IsString, Length, Matches } from 'class-validator';

export class LoginDto {
  @IsString()
  @Matches(/^[a-zA-Z0-9._@-]{3,50}$/, { message: 'Login inválido' })
  login!: string;

  @IsString()
  @Length(8, 128, { message: 'Senha inválida' })
  senha!: string;
}
