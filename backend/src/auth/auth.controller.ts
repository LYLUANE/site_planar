import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import type { UsuarioPublico } from '../usuarios/usuario.entity';
import { AuthService } from './auth.service';
import { Publico, UsuarioAtual } from './decorators';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Publico()
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @Post('login')
  @HttpCode(200)
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto);
  }

  @Get('me')
  me(@UsuarioAtual() usuario: UsuarioPublico) {
    return usuario;
  }
}
