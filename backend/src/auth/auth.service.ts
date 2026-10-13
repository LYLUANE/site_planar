import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { conferirSenha, gerarHashSenha } from '../usuarios/senha';
import { paraUsuarioPublico } from '../usuarios/usuario.entity';
import { UsuariosService } from '../usuarios/usuarios.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private readonly hashFalso = gerarHashSenha('senha-que-nunca-confere');

  constructor(
    private readonly usuarios: UsuariosService,
    private readonly jwt: JwtService,
  ) {}

  async login({ login, senha }: LoginDto) {
    const usuario = await this.usuarios.buscarComSenha(login);
    const senhaOk = await conferirSenha(
      senha,
      usuario?.senhaHash ?? (await this.hashFalso),
    );

    if (!usuario || !senhaOk) {
      throw new UnauthorizedException('Login ou senha incorretos');
    }

    const accessToken = await this.jwt.signAsync({ sub: usuario.id });
    return { accessToken, usuario: paraUsuarioPublico(usuario) };
  }
}
